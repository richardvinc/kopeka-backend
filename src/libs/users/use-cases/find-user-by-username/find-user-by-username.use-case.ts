import { Repository } from 'typeorm';

import { UserEntity } from '@libs/users/entities/user.entity';
import { UserError } from '@libs/users/errors/user.error';
import { InjectRepository } from '@nestjs/typeorm';

import { FindUserByUsernameDTO } from './find-user-by-username.dto';

export class FindUserByUsernameUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async execute(dto: FindUserByUsernameDTO) {
    const user = await this.userRepository.findOneBy({
      username: dto.username,
    });
    if (!user) throw new UserError.UserNotFound();
    return user;
  }
}
