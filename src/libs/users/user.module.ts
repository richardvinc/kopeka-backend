import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { UserMapperProfile } from './mappers/user.mapper';
import { UserService } from './services/user.service';
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case';
import { GetSelfUseCase } from './use-cases/get-self/get-self.use-case';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id/get-user-by-id.use-case';
import { GetUsernameRecommendationUseCase } from './use-cases/get-username-recomendation/get-username-recommendation.use-case';
import { IsUsernameExistsUseCase } from './use-cases/is-username-exists/is-username-exists.use-case';
import { UserController } from './user.controller';

const useCases = [
  GetUserByIdUseCase,
  IsUsernameExistsUseCase,
  CreateUserUseCase,
  GetUsernameRecommendationUseCase,
  GetSelfUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, ...useCases, UserMapperProfile],
  exports: [UserService],
})
export class UserModule {}
