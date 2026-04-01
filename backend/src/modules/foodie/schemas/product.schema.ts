import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

export const ProductCategory = {
  STARTERS: 'Starters',
  MAINS: 'Mains',
  DRINKS: 'Drinks',
  DESSERTS: 'Desserts',
} as const;

export type ProductCategory = (typeof ProductCategory)[keyof typeof ProductCategory];

@Schema({ _id: false })
export class ProductIngredient {
  @Prop({ type: Types.ObjectId, ref: 'InventoryItem', required: true })
  ingredientId: Types.ObjectId;

  @Prop({ required: true, default: 1 })
  quantity: number;
}
export const ProductIngredientSchema = SchemaFactory.createForClass(ProductIngredient);

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, index: true })
  tenantId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ enum: Object.values(ProductCategory), default: ProductCategory.MAINS })
  category: ProductCategory;

  @Prop({ default: '🍲' })
  emoji: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ type: [String], default: [] })
  modifiers: string[];

  @Prop({ type: [ProductIngredientSchema], default: [] })
  ingredients: ProductIngredient[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ tenantId: 1, name: 1 }, { unique: true });
