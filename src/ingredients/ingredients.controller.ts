import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  Delete,
} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { Ingredient, Prisma } from '@prisma/client';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get('')
  async findAll(
    @Query('skip') skip: string,
    @Query('take') take: string,
    @Query('filter') filter?: string,
  ): Promise<{ data: Ingredient[]; totalPage: number }> {
    const { data: ingredients, totalIngredients } =
      await this.ingredientsService.findAll({
        skip: parseInt(skip) || 0,
        take: parseInt(take) || 5,
        filter: filter || '',
      });

    return {
      data: ingredients,
      totalPage: Math.ceil(totalIngredients / parseInt(take)),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Ingredient> {
    return this.ingredientsService.findOne(id);
  }

  @Get('main-type/:mainType')
  findManyByMainType(
    @Param('mainType') mainType: string,
  ): Promise<Ingredient[]> {
    return this.ingredientsService.findManyByMainType(mainType);
  }

  @Post('create')
  create(@Body() data: Prisma.IngredientCreateInput): Promise<Ingredient> {
    return this.ingredientsService.create(data);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string): Promise<Ingredient> {
    return this.ingredientsService.delete(id);
  }
}
