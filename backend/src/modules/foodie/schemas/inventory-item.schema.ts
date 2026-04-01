import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InventoryItemDocument = InventoryItem & Document;

export const InventoryCategory = {
  PROTEINS: 'Proteins',
  PRODUCE: 'Produce',
  DAIRY: 'Dairy',
  BEVERAGES: 'Beverages',
  DRY_GOODS: 'Dry Goods',
} as const;

export type InventoryCategory = (typeof InventoryCategory)[keyof typeof InventoryCategory];

@Schema({ timestamps: true })
export class InventoryItem {
  @Prop({ required: true, index: true })
  tenantId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 0 })
  stock: number;

  @Prop({ required: true, default: 'unit' })
  unit: string;

  @Prop({ enum: Object.values(InventoryCategory), default: InventoryCategory.PRODUCE })
  category: InventoryCategory;

  @Prop({ default: '📦' })
  emoji: string;

  @Prop({ default: 0 })
  minStock: number;

  @Prop({ default: 100 })
  maxStock: number;

  @Prop({ default: 0 })
  cost: number;
}

export const InventoryItemSchema = SchemaFactory.createForClass(InventoryItem);
InventoryItemSchema.index({ tenantId: 1, name: 1 }, { unique: true });
