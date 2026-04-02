import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { TenantContext } from '../../../core/auth/decorators/tenant-context.decorator';
import { TenantContextDto } from '../../../core/auth/dto';
import { Public } from '../../../core/auth/decorators/public.decorator';

@Public()
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  async createItem(
    @TenantContext() context: TenantContextDto,
    @Body() dto: {
      name: string;
      stock: number;
      unit: string;
      category?: string;
      emoji?: string;
      minStock?: number;
      maxStock?: number;
      cost?: number;
    }
  ) {
    return this.inventoryService.create(context.tenantId, dto as any);
  }

  @Get()
  async getItems(@TenantContext() context: TenantContextDto) {
    return this.inventoryService.findAll(context.tenantId);
  }

  @Get(':id')
  async getItem(
    @TenantContext() context: TenantContextDto,
    @Param('id') id: string
  ) {
    return this.inventoryService.findOne(context.tenantId, id);
  }

  @Patch(':id')
  async updateItem(
    @TenantContext() context: TenantContextDto,
    @Param('id') id: string,
    @Body() dto: {
      stock?: number;
      name?: string;
      unit?: string;
      category?: string;
      emoji?: string;
      minStock?: number;
      maxStock?: number;
      cost?: number;
    }
  ): Promise<any> {
    return this.inventoryService.update(context.tenantId, id, dto as any);
  }

  @Delete(':id')
  async deleteItem(
    @TenantContext() context: TenantContextDto,
    @Param('id') id: string
  ): Promise<any> {
    return this.inventoryService.delete(context.tenantId, id);
  }
}
