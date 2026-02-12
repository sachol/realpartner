import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Property } from '@prisma/client';

@Injectable()
export class PropertyService {
  constructor(private prisma: PrismaService) {}

  async findAll(agentId: string) {
    return this.prisma.property.findMany({
      where: { agentId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(agentId: string, data: any) {
    // 2024 compliance check: All 3 mandatory boxes must be checked for VERIFIED status
    const isCompliant = 
      data.isConfirmedFixedDate && 
      data.isTaxPaymentConfirmed && 
      data.isOccupancyConfirmed;

    return this.prisma.property.create({
      data: {
        ...data,
        agentId,
        complianceStatus: isCompliant ? 'VERIFIED' : 'PENDING',
        verificationDate: isCompliant ? new Date() : null,
      },
    });
  }

  /**
   * 공공데이터 API 연동 고도화 목업
   * 주소에 포함된 키워드에 따라 다른 데이터를 반환하도록 개선
   */
  async fetchPublicData(address: string) {
    // API 호출 지연 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 800));

    const isOfficetel = address.includes('오피스텔');
    const isVilla = address.includes('빌라') || address.includes('다세대');

    return {
      exclusiveArea: isOfficetel ? 24.5 : (isVilla ? 59.8 : 84.95),
      completionYear: 2020,
      officialPrice: isOfficetel ? 300000000 : (isVilla ? 500000000 : 1200000000),
      floor: 10,
      buildingName: isOfficetel ? '그랑시티 오피스텔' : (isVilla ? '청담 빌라' : '아크로리버파크'),
      type: isOfficetel ? '오피스텔' : (isVilla ? '빌라' : '아파트'),
    };
  }
}
