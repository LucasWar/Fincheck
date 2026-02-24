import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.servive';
import { UserRepository } from './repositories/users.repositorie';
import { CategoriesRepository } from './repositories/categories.repositorie';
import { BankAccountRepository } from './repositories/bank-accounts.repositorie';
import { TransactionRepository } from './repositories/transactions.repositorie';

@Global()
@Module({
  providers: [
    PrismaService,
    UserRepository,
    CategoriesRepository,
    BankAccountRepository,
    TransactionRepository,
  ],
  exports: [
    UserRepository,
    CategoriesRepository,
    BankAccountRepository,
    TransactionRepository,
  ],
})
export class DatabaseModule {}
