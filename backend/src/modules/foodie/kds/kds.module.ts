import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KdsController } from './kds.controller';
import { KdsService } from './kds.service';
import { Order, OrderSchema } from '../schemas/order.schema';

import { KdsGateway } from './kds.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [KdsController],
  providers: [KdsService, KdsGateway],
  exports: [KdsGateway]
})
export class KdsModule {}
