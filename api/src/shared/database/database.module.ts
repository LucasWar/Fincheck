import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.servive';
import { UserRepository } from './repositories/users.repositorie';

@Global()
@Module({
    providers: [PrismaService, UserRepository],
    exports: [UserRepository],
})

export class DatabaseModule {}

