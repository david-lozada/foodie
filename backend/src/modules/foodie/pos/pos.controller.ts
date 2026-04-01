import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { PosService } from './pos.service';
import { TenantContext } from '../../../core/auth/decorators/tenant-context.decorator';
import { TenantContextDto } from '../../../core/auth/dto';
import { Public } from '../../../core/auth/decorators/public.decorator';

@Public()
@Controller('pos')
export class PosController {
  constructor(private readonly posService: PosService) {}

  @Post('products')
  async createProduct(
    @TenantContext() context: TenantContextDto,
    @Body() data: {
      name: string;
      price: number;
      category?: string;
      emoji?: string;
      description?: string;
      isAvailable?: boolean;
      modifiers?: string[];
      ingredients?: any[];
    }
  ) {
    return this.posService.createProduct(context.tenantId, data as any);
  }

  @Get('products')
  async getProducts(@TenantContext() context: TenantContextDto) {
    return this.posService.getProducts(context.tenantId);
  }

  @Patch('products/:id')
  async updateProduct(
    @TenantContext() context: TenantContextDto,
    @Param('id') id: string,
    @Body() data: Partial<{
      name: string;
      price: number;
      category: string;
      emoji: string;
      description: string;
      isAvailable: boolean;
      modifiers: string[];
    }>
  ) {
    return this.posService.updateProduct(context.tenantId, id, data as any);
  }

  @Delete('products/:id')
  async deleteProduct(
    @TenantContext() context: TenantContextDto,
    @Param('id') id: string
  ) {
    return this.posService.deleteProduct(context.tenantId, id);
  }

  @Post('orders')
  async createOrder(
    @TenantContext() context: TenantContextDto,
    @Body() data: {
      items: { productId: string; quantity: number; notes?: string; modifiers?: string[] }[];
      tableNumber?: number;
    }
  ) {
    return this.posService.createOrder(context.tenantId, data.items, data.tableNumber);
  }

  @Get('orders')
  async getOrders(@TenantContext() context: TenantContextDto) {
    return this.posService.getOrders(context.tenantId);
  }
}
