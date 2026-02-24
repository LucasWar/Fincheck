import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountRepository } from 'src/shared/database/repositories/bank-accounts.repositorie';
import { ValidateBanckAccountOwnership } from './validate-bank-accounts-ownership.service';
import { TransactionType } from '../transactions/entities/TransactionType';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountRepository,
    private readonly validate: ValidateBanckAccountOwnership,
  ) {}

  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { name, type, color, initialBalance } = createBankAccountDto;

    return this.bankAccountsRepo.create({
      data: {
        userId,
        name,
        initialBalance,
        color,
        type,
      },
    });
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepo.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
            id: true,
          },
        },
      },
    });

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransaction = transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type === TransactionType.INCOME
            ? transaction.value
            : -transaction.value),
        0,
      );

      const currentBalance = bankAccount.initialBalance + totalTransaction;

      return {
        totalTransaction,
        ...bankAccount,
        currentBalance,
      };
    });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} bankAccount`;
  // }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validate.validateBanckAccountOwnership(userId, bankAccountId);

    const { name, type, color, initialBalance } = updateBankAccountDto;

    return this.bankAccountsRepo.update({
      where: {
        id: bankAccountId,
      },
      data: {
        name,
        initialBalance,
        color,
        type,
      },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validate.validateBanckAccountOwnership(userId, bankAccountId);

    await this.bankAccountsRepo.delete({
      where: { id: bankAccountId },
    });

    return null;
  }
}
