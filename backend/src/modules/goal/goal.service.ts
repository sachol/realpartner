import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Goal } from '@prisma/client';

@Injectable()
export class GoalService {
  constructor(private prisma: PrismaService) {}

  /**
   * 매출 목표를 기반으로 주간 활동 목표를 역산합니다.
   * 기본 가정:
   * - 평균 중개보수: 500만원
   * - 계약 성사율 (임장 -> 계약): 20% (1/5)
   * - 임장 유도율 (통화 -> 임장): 20% (1/5)
   */
  async calculateWeeklyGoals(userId: string, targetRevenue: number) {
    const avgCommission = 5000000; // 500만원
    const closingRate = 0.2; // 20%
    const showingRate = 0.2; // 20%
    
    // 1. 필요 계약 건수
    const requiredContracts = Number(targetRevenue) / avgCommission;
    
    // 2. 필요 임장 수 (계약 수 / 계약 성사율)
    const requiredShowings = Math.ceil(requiredContracts / closingRate);
    
    // 3. 필요 통화/활동 수 (임장 수 / 임장 유도율)
    const requiredCalls = Math.ceil(requiredShowings / showingRate);
    
    // 4. 필요 매물 확보 수 (계약 수의 2배수 가정)
    const requiredListings = Math.ceil(requiredContracts * 2);

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    // 1. 기존 목표 확인
    const existingGoal = await this.prisma.goal.findFirst({
      where: { userId, year, month }
    });

    if (existingGoal) {
      // 기존 목표 삭제 (Cascade 설정 점검 필요, 일단 WeeklyGoal도 같이 지워야 함)
      await this.prisma.weeklyGoal.deleteMany({ where: { goalId: existingGoal.id }});
      await this.prisma.goal.delete({ where: { id: existingGoal.id }});
    }

    // 2. 새 목표 생성
    return this.prisma.goal.create({
      data: {
        userId,
        year,
        month,
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
  }

  async getGoal(userId: string) {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    return this.prisma.goal.findFirst({
      where: { userId, year, month },
      include: { weeklyGoals: true }
    });
  }

  async seed() {
    const user = await this.prisma.user.upsert({
      where: { email: 'sachol.cap@gmail.com' },
      update: {},
      create: {
        id: 'user-123',
        email: 'sachol.cap@gmail.com',
        password: 'password123',
        name: '김사철',
        role: 'AGENT',
        monthlyGoal: 10000000,
      },
    });
    return { message: 'Seed complete', user };
  }
}
