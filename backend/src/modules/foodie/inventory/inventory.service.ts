import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { InventoryItem, InventoryItemDocument } from '../schemas/inventory-item.schema';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(InventoryItem.name) private inventoryModel: Model<InventoryItemDocument>,
  ) {}

  async create(tenantId: string, data: Partial<InventoryItem>) {
    const item = new this.inventoryModel({ tenantId, ...data });
    return item.save();
  }

  async findAll(tenantId: string) {
    return this.inventoryModel.find({ tenantId }).exec();
  }

  async findOne(tenantId: string, id: string) {
    return this.inventoryModel.findOne({ _id: id, tenantId }).exec();
  }

  async decrementStock(tenantId: string, updates: { ingredientId: Types.ObjectId | string; quantity: number }[]) {
    const bulkOps = updates.map((update) => ({
      updateOne: {
        filter: { _id: update.ingredientId, tenantId },
        update: { $inc: { stock: -update.quantity } },
      },
    }));

    if (bulkOps.length > 0) {
      await this.inventoryModel.bulkWrite(bulkOps);
    }
  }

  async update(tenantId: string, id: string, updates: Partial<InventoryItem>) {
    return this.inventoryModel.findOneAndUpdate(
      { _id: id, tenantId },
      { $set: updates },
      { new: true }
    ).exec();
  }

  async delete(tenantId: string, id: string) {
    return this.inventoryModel.deleteOne({ _id: id, tenantId }).exec();
  }
}
