import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

export const OrderStatus = {
  PENDING: 'pending',
  PREPARING: 'preparing',
  READY: 'ready',
  FINISHED: 'finished',
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

@Schema({ _id: false })
export class OrderItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true, default: 1 })
  quantity: number;

  @Prop()
  notes?: string;

  @Prop()
  name?: string;

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop({ type: [String], default: [] })
  modifiers: string[];
}
export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, index: true })
  tenantId: string;

  @Prop({ type: [OrderItemSchema], default: [] })
  items: OrderItem[];

  @Prop({ required: true, enum: Object.values(OrderStatus), default: OrderStatus.PENDING })
  status: OrderStatus;

  @Prop({ required: true, default: 0 })
  total: number;

  @Prop()
  tableNumber?: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.index({ tenantId: 1, status: 1 });
OrderSchema.index({ tenantId: 1, createdAt: -1 });
