import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { GoalService } from './goal.service';

@Controller('goals')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post(':userId')
  async createGoal(
    @Param('userId') userId: string,
    @Body() body: { targetRevenue: number },
  ) {
    return this.goalService.calculateWeeklyGoals(userId, body.targetRevenue);
  }

  @Get(':userId/current')
  async getCurrentGoal(@Param('userId') userId: string) {
    return this.goalService.getGoal(userId);
  }
}
