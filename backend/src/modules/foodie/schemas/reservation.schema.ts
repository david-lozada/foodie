import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReservationDocument = Reservation & Document;

export const ReservationStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;

export type ReservationStatus = (typeof ReservationStatus)[keyof typeof ReservationStatus];

export const ReservationType = {
  TABLE: 'table',
  RESTAURANT: 'restaurant',
} as const;

export type ReservationType = (typeof ReservationType)[keyof typeof ReservationType];

@Schema({ timestamps: true })
export class Reservation {
  @Prop({ required: true, index: true })
  tenantId: string;

  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  customerPhone: string;

  @Prop()
  customerEmail?: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  numberOfPeople: number;

  @Prop({ required: true, enum: Object.values(ReservationType), default: ReservationType.TABLE })
  type: ReservationType;

  @Prop()
  tableNumber?: string;

  @Prop({ type: Types.ObjectId, ref: 'Order' })
  orderId?: Types.ObjectId;

  @Prop({ required: true, enum: Object.values(ReservationStatus), default: ReservationStatus.PENDING })
  status: ReservationStatus;

  @Prop()
  notes?: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
ReservationSchema.index({ tenantId: 1, date: 1 });
