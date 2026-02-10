import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GoalService {
  constructor(private prisma: PrismaService) {}

  /**
   * 매출 목표를 기반으로 주간 활동 목표를 역산합니다.
   * 기본 가정:
   * - 평균 중개보수: 500만원
   * - 계약 성사율 (임장 -> 계약): 10%
   * - 임장 필요 리드 수: 5명
   */
  async calculateWeeklyGoals(userId: string, targetRevenue: Float32Array) {
    const avgCommission = 5000000; // 500만원
    const closingRate = 0.1; // 10%
    
    const requiredContracts = Number(targetRevenue) / avgCommission;
    const requiredShowings = Math.ceil(requiredContracts / closingRate);
    const requiredCalls = requiredShowings * 5;
    const requiredListings = Math.ceil(requiredContracts * 2);

    // Goal 엔티티 생성
    const goal = await this.prisma.goal.create({
      data: {
        userId,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        targetRevenue: Number(targetRevenue),
        weeklyGoals: {
          create: Array.from({ length: 4 }).map((_, i) => ({
            weekNumber: i + 1,
            requiredShowings: Math.ceil(requiredShowings / 4),
            requiredCalls: Math.ceil(requiredCalls / 4),
            requiredListings: Math.ceil(requiredListings / 4),
          })),
        },
      },
      include: { weeklyGoals: true },
    });

    return goal;
  }
}
