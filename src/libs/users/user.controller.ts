import { FirebaseAuthGuard } from '@libs/auth/guards/firebase-auth.guard';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './use-cases/create-user/create-user.dto';
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case';
import { FindUserByIdDTO } from './use-cases/find-user-by-id/find-user-by-id.dto';
import { FindUserByIdUseCase } from './use-cases/find-user-by-id/find-user-by-id.use-case';
import { FindUserByUsernameDTO } from './use-cases/find-user-by-username/find-user-by-username.dto';
import { FindUserByUsernameUseCase } from './use-cases/find-user-by-username/find-user-by-username.use-case';

@UseGuards(FirebaseAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private findUserByIdUseCase: FindUserByIdUseCase,
    private findUserByUsernameUseCase: FindUserByUsernameUseCase,
    private createUserUseCase: CreateUserUseCase,
  ) {}

  @Get('/id/:id')
  async findOneById(@Param() dto: FindUserByIdDTO): Promise<UserEntity> {
    return await this.findUserByIdUseCase.execute(dto);
  }

  @Get('/username/:username')
  async findOneByUsername(
    @Param() dto: FindUserByUsernameDTO,
  ): Promise<UserEntity> {
    return await this.findUserByUsernameUseCase.execute(dto);
  }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return await this.createUserUseCase.execute(dto);
  }
}
