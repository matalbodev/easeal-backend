import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Ingredient, Prisma } from '@prisma/client';

@Injectable()
export class IngredientsService {
  constructor(private prisma: PrismaService) {}

  count(): Promise<number> {
    return this.prisma.ingredient.count();
  }

  async findAll({ skip, take, filter }): Promise<{
    data: Ingredient[];
    totalIngredients: number;
  }> {
    const ingredients = await this.prisma.ingredient.findMany({
      skip,
      take,
      where: {
        mainType: { contains: filter },
      },
      orderBy: {
        name: 'asc',
      },
    });
    // count total ingredients returned from the query
    const totalIngredients = await this.prisma.ingredient.count({
      where: {
        mainType: { contains: filter },
      },
    });
    return {
      data: ingredients,
      totalIngredients,
    };
  }

  findOne(id: string): Promise<Ingredient> {
    return this.prisma.ingredient.findUnique({
      where: { id },
    });
  }

  findManyByMainType(mainType: string): Promise<Ingredient[]> {
    return this.prisma.ingredient.findMany({
      where: { mainType },
    });
  }

  create(data: Prisma.IngredientCreateInput): Promise<Ingredient> {
    return this.prisma.ingredient.create({ data });
  }

  delete(id: string): Promise<Ingredient> {
    return this.prisma.ingredient.delete({
      where: { id },
    });
  }
}
