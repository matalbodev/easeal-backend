import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientsModule } from './ingredients/ingredients.module';
import { MealsModule } from './meals/meals.module';

@Module({
  imports: [IngredientsModule, MealsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
