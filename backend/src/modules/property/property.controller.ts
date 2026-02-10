import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { PropertyService } from './property.service';

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get(':agentId')
  async getProperties(@Param('agentId') agentId: string) {
    return this.propertyService.findAll(agentId);
  }

  @Post(':agentId')
  async createProperty(@Param('agentId') agentId: string, @Body() data: any) {
    return this.propertyService.create(agentId, data);
  }

  @Get('public-data/fetch')
  async getPublicData(@Query('address') address: string) {
    return this.propertyService.fetchPublicData(address);
  }
}
