import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { UserMapperProfile } from './mappers/user.mapper';
import { UserService } from './services/user.service';
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case';
import { FindUserByIdUseCase } from './use-cases/find-user-by-id/find-user-by-id.use-case';
import { FindUserByUsernameUseCase } from './use-cases/find-user-by-username/find-user-by-username.use-case';
import { UserController } from './user.controller';

const useCases = [
  FindUserByIdUseCase,
  FindUserByUsernameUseCase,
  CreateUserUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, ...useCases, UserMapperProfile],
  exports: [UserService],
})
export class UserModule {}
