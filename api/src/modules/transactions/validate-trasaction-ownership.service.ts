import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from 'src/shared/database/repositories/transactions.repositorie';

@Injectable()
export class ValidateTransactionOwnership {
  constructor(private readonly transactionRepo: TransactionRepository) {}

  async validateTransactionOwnership(userId: string, transactionId: string) {
    const isOwner = await this.transactionRepo.findFirst({
      where: {
        userId,
        id: transactionId,
      },
    });

    if (!isOwner) {
      throw new NotFoundException('Transaction not found.');
    }
  }
}
