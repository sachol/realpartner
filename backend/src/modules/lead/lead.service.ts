import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
// import { LeadGrade } from '@prisma/client'; // Enum removed

export const LeadGrade = {
  HOT: 'HOT',
  WARM: 'WARM',
  COLD: 'COLD',
};

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
  private calculateLeadGrade(data: any): string {
    const budget = data.budget || 0;
    const hasTargetDate = !!data.targetDate;

    if (budget > 1000000000 && hasTargetDate) return LeadGrade.HOT;
    if (budget > 500000000 || hasTargetDate) return LeadGrade.WARM;
    return LeadGrade.COLD;
  }

  /**
   * AI 마케팅 문구 생성 (HTML 형식)
   */
  async generateMarketingMessage(leadId: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) return null;

    // 스마트 매칭: 리드의 희망 지역과 예산에 맞는 매물 검색
    const matchingProperties = await this.prisma.property.findMany({
      where: {
        agentId: lead.agentId,
        address: { contains: lead.preferredRegion || '' },
        officialPrice: { lte: lead.budget || 2000000000 }
      },
      take: 1
    });

    const property = matchingProperties[0];
    const propertyInfo = property 
      ? `현재 관심 있으신 <strong>${lead.preferredRegion}</strong> 지역에 딱 맞는 <strong>${property.buildingName}</strong> 매물이 새로 등록되었습니다.`
      : `관심 있으신 <strong>${lead.preferredRegion}</strong> 지역의 최신 시장 정보와 맞춤형 투자 리포트를 준비했습니다.`;

    const htmlContent = `
<div style="font-family: 'Malgun Gothic', sans-serif; line-height: 1.6; color: #2d3436; padding: 24px; background: #ffffff; border-radius: 16px; border: 1px solid #e1e8ed; max-width: 450px;">
  <div style="background: #3b82f6; width: 40px; height: 4px; border-radius: 2px; margin-bottom: 20px;"></div>
  <h2 style="color: #1a1c1e; font-size: 1.25rem; margin-bottom: 16px; font-weight: 700;">안녕하세요, ${lead.name} 고객님!</h2>
  <p style="margin-bottom: 20px;">${propertyInfo}</p>
  
  <div style="background: #f1f5f9; padding: 16px; border-radius: 12px; margin-bottom: 24px;">
    <p style="margin-bottom: 8px; font-weight: 600; color: #475569; font-size: 0.9rem;">💎 AgentPartner AI 추천 포인트</p>
    <p style="margin: 0; color: #334155; font-size: 0.9rem;">
      고객님의 가용 예산(${(Number(lead.budget) / 100000000).toFixed(1)}억)을 고려했을 때, 
      상승 여력이 가장 높은 최적의 매칭 결과입니다.
    </p>
  </div>

  <div style="border-top: 1px solid #f1f5f9; padding-top: 20px;">
    <p style="margin-bottom: 12px; font-weight: 600; font-size: 0.95rem;">[ 안내 사항 ]</p>
    <ul style="padding-left: 20px; margin: 0; color: #64748b; font-size: 0.9rem;">
      <li style="margin-bottom: 6px;">희망 지역: ${lead.preferredRegion}</li>
      <li style="margin-bottom: 6px;">맞춤 매물: ${property ? property.buildingName : '상담 시 안내 가능'}</li>
      <li>담당자: AgentPartner 파트너</li>
    </ul>
  </div>

  <p style="margin-top: 32px; font-size: 0.75rem; color: #94a3b8; text-align: center;">
    본 안내는 실시간 시장 데이터를 기반으로 AI가 작성한 맞춤형 정보입니다.
  </p>
</div>
    `;

    return {
      leadId,
      customerName: lead.name,
      htmlContent,
      property: property || null,
    };
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
