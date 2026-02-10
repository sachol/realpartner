import { Module } from '@nestjs/common';
import { GoalModule } from './modules/goal/goal.module';
import { PropertyModule } from './modules/property/property.module';
import { LeadModule } from './modules/lead/lead.module';

@Module({
  imports: [GoalModule, PropertyModule, LeadModule],
})
export class AppModule {}
