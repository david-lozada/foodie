import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { Order, OrderDocument, OrderStatus } from '../schemas/order.schema';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class PosService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private inventoryService: InventoryService,
  ) {}

  async createProduct(tenantId: string, data: Partial<Product>) {
    const product = new this.productModel({ tenantId, ...data });
    return product.save();
  }

  async getProducts(tenantId: string) {
    return this.productModel.find({ tenantId }).exec();
  }

  async updateProduct(tenantId: string, id: string, data: Partial<Product>) {
    const product = await this.productModel.findOneAndUpdate(
      { _id: id, tenantId },
      { $set: data },
      { new: true }
    ).exec();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async deleteProduct(tenantId: string, id: string) {
    const result = await this.productModel.deleteOne({ _id: id, tenantId }).exec();
    if (result.deletedCount === 0) throw new NotFoundException('Product not found');
    return { success: true };
  }

  async createOrder(
    tenantId: string,
    items: { productId: string; quantity: number; notes?: string; modifiers?: string[] }[],
    tableNumber?: number,
  ) {
    const productIds = items.map((item) => item.productId);
    const products = await this.productModel.find({ _id: { $in: productIds }, tenantId }).exec();

    if (products.length !== productIds.length) {
      throw new NotFoundException('Some products were not found');
    }

    let total = 0;
    const inventoryUpdates: { ingredientId: any; quantity: number }[] = [];

    const orderItems = items.map((item) => {
      const product = products.find((p) => p._id.toString() === item.productId);
      if (!product) throw new NotFoundException('Product not found');

      total += product.price * item.quantity;

      for (const ing of product.ingredients) {
        inventoryUpdates.push({
          ingredientId: ing.ingredientId,
          quantity: ing.quantity * item.quantity,
        });
      }

      return {
        productId: product._id,
        quantity: item.quantity,
        notes: item.notes,
        name: product.name,
        price: product.price,
        modifiers: item.modifiers || [],
      };
    });

    const order = new this.orderModel({
      tenantId,
      items: orderItems,
      total,
      tableNumber,
      status: OrderStatus.PENDING,
    });

    await order.save();

    if (inventoryUpdates.length > 0) {
      await this.inventoryService.decrementStock(tenantId, inventoryUpdates);
    }

    return order;
  }

  async getOrders(tenantId: string) {
    return this.orderModel.find({ tenantId }).sort({ createdAt: -1 }).exec();
  }
}
