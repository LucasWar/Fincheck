import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repositorie';

@Injectable()
export class ValidateCategoryOwnership {
  constructor(private readonly categoryRepo: CategoriesRepository) {}

  async validateCategoryOwnership(userId: string, categoryId: string) {
    const isOwner = await this.categoryRepo.findFirst({
      where: {
        userId,
        id: categoryId,
      },
    });

    if (!isOwner) {
      throw new NotFoundException('Category not found.');
    }
  }
}
