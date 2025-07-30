import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Hash the passwords
  const hashedPassword1 = await bcrypt.hash('TestDel2000@', 10);
  const hashedPassword2 = await bcrypt.hash('V230678', 10);

  // Create first admin user
  const admin1 = await prisma.user.upsert({
    where: { email: 'ruslanmakhmatov@gmail.com' },
    update: {},
    create: {
      email: 'ruslanmakhmatov@gmail.com',
      password: hashedPassword1,
      role: 'admin',
    },
  });

  // Create second admin user
  const admin2 = await prisma.user.upsert({
    where: { email: 'v80505934163@yandex.ru' },
    update: {},
    create: {
      email: 'v80505934163@yandex.ru',
      password: hashedPassword2,
      role: 'admin',
    },
  });

  console.log('Admin user 1 created:', admin1);
  console.log('Admin user 2 created:', admin2);
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
