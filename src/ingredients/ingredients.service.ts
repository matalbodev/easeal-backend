import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Ingredient, Prisma } from '@prisma/client';

@Injectable()
export class IngredientsService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Ingredient[]> {
    return this.prisma.ingredient.findMany();
  }

  findOne(id: string): Promise<Ingredient> {
    return this.prisma.ingredient.findUnique({
      where: { id },
    });
  }

  create(data: Prisma.IngredientCreateInput): Promise<Ingredient> {
    return this.prisma.ingredient.create({ data });
  }
}
