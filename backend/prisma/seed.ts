import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Create User
  const user = await prisma.user.upsert({
    where: { email: 'sachol.cap@gmail.com' },
    update: {},
    create: {
      id: 'user-123',
      email: 'sachol.cap@gmail.com',
      password: 'password123', // In real app, hash this!
      name: '김사철',
      role: 'AGENT',
      monthlyGoal: 10000000,
    },
  });

  console.log({ user });

  // 2. Create Initial Leads (Optional, for testing)
  const lead1 = await prisma.lead.create({
    data: {
      name: '김철수',
      phone: '010-1234-5678',
      agentId: user.id,
      grade: 'HOT',
      budget: 500000000,
      preferredRegion: '강남구',
      notes: {
        create: {
          content: '투자 목적으로 갭투자 매물 찾고 있음',
        }
      }
    }
  });

  console.log({ lead1 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
