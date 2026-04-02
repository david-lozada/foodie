import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { InventoryModule } from '../foodie/inventory/inventory.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [InventoryModule, ConfigModule],
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
