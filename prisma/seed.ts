import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

// remove all ingredients before seeding
async function removeIngredients() {
  const ingredients = await prisma.ingredient.findMany();
  ingredients.forEach(async (ingredient) => {
    await prisma.ingredient.delete({
      where: {
        id: ingredient.id,
      },
    });
  });
}

async function main() {
  await removeIngredients();

  // axios get request to get the data from the API
  const response = await axios.get('https://fruityvice.com/api/fruit/all');
  const fruits = response.data;

  // loop through the data and create a new ingredient for each fruit
  fruits.forEach(async (fruit) => {
    const nutritions = fruit.nutritions;
    const nutritionsClone = { ...nutritions };
    delete nutritionsClone.calories;
    const highestNutrition = Object.keys(nutritionsClone).reduce((a, b) =>
      nutritionsClone[a] > nutritionsClone[b] ? a : b,
    );

    await prisma.ingredient.create({
      data: {
        name: fruit.name,
        kcal: fruit.nutritions.calories,
        mainType: highestNutrition,
      },
    });
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
