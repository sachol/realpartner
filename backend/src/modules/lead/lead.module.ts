import { Module } from '@nestjs/common';
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [LeadController],
  providers: [LeadService, PrismaService],
})
export class LeadModule {}
