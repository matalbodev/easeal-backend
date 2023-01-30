import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';
import { PrismaService } from '../prisma.service';
import { Test } from '@nestjs/testing/test';

describe('IngredientsController', () => {
  let controller: IngredientsController;

  const mockPrisma = {
    ingredient: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [IngredientsController],
      providers: [
        IngredientsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    controller = app.get<IngredientsController>(IngredientsController);
  });

  describe('findAll', () => {
    it('should return an array of ingredients', async () => {
      const result = ['test'];
      mockPrisma.ingredient.findMany.mockReturnValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return an ingredient', async () => {
      const result = 'test';
      mockPrisma.ingredient.findUnique.mockReturnValue(result);

      expect(await controller.findOne('1')).toBe(result);
    });
  });
});
