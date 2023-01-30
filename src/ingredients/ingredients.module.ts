import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { PrismaService } from 'src/prisma.service';
import { IngredientsController } from './ingredients.controller';

@Module({
  controllers: [IngredientsController],
  providers: [IngredientsService, PrismaService],
})
export class IngredientsModule {}
