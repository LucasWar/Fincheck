import { Module } from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccountsController } from './bank-accounts.controller';
import { ValidateBanckAccountOwnership } from './validate-bank-accounts-ownership.service';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, ValidateBanckAccountOwnership],
  exports: [ValidateBanckAccountOwnership],
})
export class BankAccountsModule {}
