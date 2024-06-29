import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { IsEmailNotRegistered } from './validation-rules/email-not-registered.rule';
import { IUserRepository } from './repositories/user.repository.interface';
import { PrismaRepository } from './repositories';
import { PrismaClient } from '@prisma/client';
import { PrismaClientConnection } from 'src/infra';

@Module({
  providers: [
    UsersService,
    IsEmailNotRegistered,
    {
      provide: PrismaClient,
      useClass: PrismaClientConnection,
    },
    {
      provide: IUserRepository,
      useClass: PrismaRepository.UserRepository,
    },
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
