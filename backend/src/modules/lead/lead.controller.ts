import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LeadService } from './lead.service';

@Controller('leads')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Get(':agentId')
  async getLeads(@Param('agentId') agentId: string) {
    return this.leadService.findAll(agentId);
  }

  @Post(':agentId')
  async createLead(@Param('agentId') agentId: string, @Body() data: any) {
    return this.leadService.create(agentId, data);
  }

  @Post(':leadId/notes')
  async addNote(@Param('leadId') leadId: string, @Body('content') content: string) {
    return this.leadService.addNote(leadId, content);
  }

  @Get(':leadId/marketing-message')
  async getMarketingMessage(@Param('leadId') leadId: string) {
    return this.leadService.generateMarketingMessage(leadId);
  }
}
