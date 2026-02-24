import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountRepository } from 'src/shared/database/repositories/bank-accounts.repositorie';

@Injectable()
export class ValidateBanckAccountOwnership {
  constructor(private readonly bankAccountsRepo: BankAccountRepository) {}

  async validateBanckAccountOwnership(userId: string, bankAccountId: string) {
    const isOwner = await this.bankAccountsRepo.findFirst({
      where: {
        userId,
        id: bankAccountId,
      },
    });

    if (!isOwner) {
      throw new NotFoundException('Bank account not found.');
    }
  }
}
