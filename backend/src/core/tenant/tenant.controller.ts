import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Query,
  BadRequestException,
  Patch,
  Body,
  UseGuards,
} from '@nestjs/common';
import { TenantRepository } from './repositories/tenant.repository';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLES } from '../common/constants/roles';
import { RolesGuard } from '../auth/guards/roles.guard';
import { TenantContext } from '../auth/decorators/tenant-context.decorator';
import { TenantContextDto } from '../auth/dto';
import { Tenant } from '../schemas/tenant.schema';

@Controller('tenants')
export class TenantController {
  constructor(private tenantRepository: TenantRepository) {}

  @Patch('settings')
  @UseGuards(RolesGuard)
  @Roles(ROLES.ADMIN, ROLES.SUPERADMIN)
  async updateSettings(
    @TenantContext() context: TenantContextDto,
    @Body() settings: Partial<Tenant['settings']>
  ) {
    const updated = await this.tenantRepository.patchSettings(context.slug, settings);
    if (!updated) throw new NotFoundException('Tenant not found');
    return updated.settings;
  }

  @Public()
  @Get('verify/:slug')
  async verifyTenant(@Param('slug') slug: string) {
    const tenant = await this.tenantRepository.findBySlugLean(
      slug.toLowerCase().trim(),
    );

    if (!tenant) throw new NotFoundException('Organization not found');

    return {
      slug: tenant.slug,
      name: tenant.name,
      logoUrl: tenant.settings?.logoUrl,
      themeColor: tenant.settings?.themeColor,
      requireInvite: tenant.settings?.requireInvite || false,
    };
  }

  @Public()
  @Get('detect')
  async detectByDomain(@Query('domain') domain: string) {
    if (!domain) throw new BadRequestException('Domain required');

    const tenant = await this.tenantRepository.findByDomainLean(
      domain.toLowerCase(),
    );

    if (!tenant) throw new NotFoundException('Unknown domain');

    return { slug: tenant.slug, name: tenant.name };
  }
}
