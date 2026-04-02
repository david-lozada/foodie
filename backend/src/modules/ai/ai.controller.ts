import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { RolesGuard } from '../../core/auth/guards/roles.guard';
import { Roles } from '../../core/auth/decorators/roles.decorator';
import { ROLES } from '../../core/common/constants/roles';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('scan-invoice')
  @UseGuards(RolesGuard)
  @Roles(ROLES.ADMIN, ROLES.MANAGER)
  async scanInvoice(@Body() data: { imageBase64: string }) {
    return this.aiService.scanInvoice(data.imageBase64);
  }
}
