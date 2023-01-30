import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.ingredient.create({
    data: {
      name: 'Pasta',
      kcal: 400,
      mainType: 'carbohydrate',
    },
  });
  await prisma.ingredient.create({
    data: {
      name: 'Tomato sauce',
      kcal: 100,
      mainType: 'carbohydrate',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
