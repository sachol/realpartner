import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { LeadGrade } from '@prisma/client';

@Injectable()
export class LeadService {
  constructor(private prisma: PrismaService) {}

  async findAll(agentId: string) {
    return this.prisma.lead.findMany({
      where: { agentId },
      include: { notes: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(agentId: string, data: any) {
    const grade = this.calculateLeadGrade(data);
    return this.prisma.lead.create({
      data: {
        ...data,
        grade,
        agentId,
      },
    });
  }

  async addNote(leadId: string, content: string) {
    return this.prisma.note.create({
      data: {
        content,
        leadId,
      },
    });
  }

  /**
   * AI 리드 스코어링 시뮬레이션
   * 예산, 입주 희망일 등을 기반으로 등급 부여
   */
  private calculateLeadGrade(data: any): LeadGrade {
    const budget = data.budget || 0;
    const hasTargetDate = !!data.targetDate;

    if (budget > 1000000000 && hasTargetDate) return LeadGrade.HOT;
    if (budget > 500000000 || hasTargetDate) return LeadGrade.WARM;
    return LeadGrade.COLD;
  }

  /**
   * 매물 기반 고객 매칭 로직
   */
  async findMatchingLeads(propertyData: any) {
    return this.prisma.lead.findMany({
      where: {
        budget: { gte: propertyData.officialPrice * 0.8 }, // 예산 범위 필터 예시
        preferredRegion: { contains: propertyData.address.split(' ')[0] },
      },
    });
  }
}
