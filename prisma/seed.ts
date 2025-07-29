import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Hash the password
  const hashedPassword = await bcrypt.hash('TestDel2000@', 10);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'ruslanmakhmatov@gmail.com' },
    update: {},
    create: {
      email: 'ruslanmakhmatov@gmail.com',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('Admin user created:', admin);
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
