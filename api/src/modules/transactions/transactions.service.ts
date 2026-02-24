import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionRepository } from 'src/shared/database/repositories/transactions.repositorie';
import { ValidateBanckAccountOwnership } from '../bank-accounts/validate-bank-accounts-ownership.service';
import { ValidateCategoryOwnership } from '../categories/validate-categories-ownership.service';
import { ValidateTransactionOwnership } from './validate-trasaction-ownership.service';
import { TransactionType } from './entities/TransactionType';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionRepo: TransactionRepository,
    private readonly validateBankAccount: ValidateBanckAccountOwnership,
    private readonly validateCategory: ValidateCategoryOwnership,
    private readonly validateTransaction: ValidateTransactionOwnership,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, date, name, type, value } =
      createTransactionDto;

    await this.validateEntitiesOwnerships({
      userId,
      bankAccountId,
      categoryId,
    });

    return await this.transactionRepo.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        datasource: date,
        name,
        type,
        value,
      },
    });
  }

  async findAllById(
    userId: string,
    filter: {
      moth: number;
      year: number;
      bankAccountId?: string;
      transactionType?: TransactionType;
    },
  ) {
    return await this.transactionRepo.findMany({
      where: {
        userId,
        bankAccountId: filter.bankAccountId,
        type: filter.transactionType,
        datasource: {
          gte: new Date(Date.UTC(filter.year, filter.moth)),
          lte: new Date(Date.UTC(filter.year, filter.moth + 1)),
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId } = updateTransactionDto;
    await this.validateEntitiesOwnerships({
      userId,
      categoryId,
      bankAccountId,
      transactionId,
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnerships({
      userId,
      transactionId,
    });

    await this.transactionRepo.delete({
      where: {
        id: transactionId,
      },
    });
  }

  private async validateEntitiesOwnerships({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      transactionId &&
        this.validateTransaction.validateTransactionOwnership(
          userId,
          transactionId,
        ),
      bankAccountId &&
        this.validateBankAccount.validateBanckAccountOwnership(
          userId,
          bankAccountId,
        ),
      categoryId &&
        this.validateCategory.validateCategoryOwnership(userId, categoryId),
    ]);
  }
}
