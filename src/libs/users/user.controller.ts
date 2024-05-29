import { User } from '@libs/auth/decorators/user.decorator';
import { FirebaseAuthGuard } from '@libs/auth/guards/firebase-auth.guard';
import { IUserIdentity } from '@libs/auth/interfaces/user.interface';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CreateUserDto } from './use-cases/create-user/create-user.dto';
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case';
import { GetSelfUseCase } from './use-cases/get-self/get-self.use-case';
import { GetUserByIdDTO } from './use-cases/get-user-by-id/get-user-by-id.dto';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id/get-user-by-id.use-case';
import { GetUsernameRecommendationDTO } from './use-cases/get-username-recomendation/get-username-recommendation.dto';
import { GetUsernameRecommendationUseCase } from './use-cases/get-username-recomendation/get-username-recommendation.use-case';
import { IsUsernameExistsDTO } from './use-cases/is-username-exists/is-username-exists.dto';
import { IsUsernameExistsUseCase } from './use-cases/is-username-exists/is-username-exists.use-case';

@UseGuards(FirebaseAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private getUserByIdUseCase: GetUserByIdUseCase,
    private getSelfUseCase: GetSelfUseCase,
    private isUsernameExistsUseCase: IsUsernameExistsUseCase,
    private createUserUseCase: CreateUserUseCase,
    private getUsernameRecommendationUseCase: GetUsernameRecommendationUseCase,
  ) {}

  @Get('/self')
  async getSelf(@User() user: IUserIdentity) {
    return await this.getSelfUseCase.execute({
      firebaseUid: user.firebaseUid,
    });
  }

  @Get('/id/:id')
  async getOneById(@Param() dto: GetUserByIdDTO) {
    return await this.getUserByIdUseCase.execute(dto);
  }

  @Get('/username/:username/is-exists')
  async isUsernameExists(@Param() dto: IsUsernameExistsDTO) {
    return await this.isUsernameExistsUseCase.execute(dto);
  }

  @Post('/username/recommendations')
  async getUsernameRecommendations(@Body() dto: GetUsernameRecommendationDTO) {
    return await this.getUsernameRecommendationUseCase.execute(dto);
  }

  @Post('/')
  async createUser(@User() user: IUserIdentity, @Body() dto: CreateUserDto) {
    return await this.createUserUseCase.execute({
      ...dto,
      firebaseUid: user.firebaseUid,
    });
  }
}
