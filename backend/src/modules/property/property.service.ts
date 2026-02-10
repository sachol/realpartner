import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Property, PropertyStatus } from '@prisma/client';

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
    return this.prisma.property.create({
      data: {
        ...data,
        agentId,
      },
    });
  }

  /**
   * 공공데이터 API 연동 목업
   * 실제로는 국토교통부 건축물대장 API 등을 호출합니다.
   */
  async fetchPublicData(address: string) {
    // API 호출 지연 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      exclusiveArea: 84.95,
      completionYear: 2018,
      officialPrice: 1200000000,
      floor: 15,
      buildingName: '아크로리버파크',
      type: '아파트',
    };
  }
}
