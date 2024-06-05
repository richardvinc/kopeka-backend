import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { UserMapperProfile } from './mappers/user.mapper';
import { UserService } from './services/user.service';
import { CreateUsernameUseCase } from './use-cases/create-username/create-username.use-case';
import { GetSelfUseCase } from './use-cases/get-self/get-self.use-case';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id/get-user-by-id.use-case';
import { GetUsernameRecommendationUseCase } from './use-cases/get-username-recomendation/get-username-recommendation.use-case';
import { IsUsernameExistsUseCase } from './use-cases/is-username-exists/is-username-exists.use-case';
import { UpdateUserUseCase } from './use-cases/update-user/update-user.use-case';
import { USER_SERVICE } from './user.contants';
import { UserController } from './user.controller';

const Services: Provider[] = [
  {
    provide: USER_SERVICE,
    useClass: UserService,
  },
];

const useCases = [
  GetUserByIdUseCase,
  IsUsernameExistsUseCase,
  CreateUsernameUseCase,
  GetUsernameRecommendationUseCase,
  GetSelfUseCase,
  UpdateUserUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [...Services, ...useCases, UserMapperProfile],
  exports: [...Services],
})
export class UserModule {}
