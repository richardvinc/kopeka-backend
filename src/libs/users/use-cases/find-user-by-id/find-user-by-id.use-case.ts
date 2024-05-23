import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from '../../entities/user.entity';
import { UserError } from '../../errors/user.error';
import { FindUserByIdDTO } from './find-user-by-id.dto';

export class FindUserByIdUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(dto: FindUserByIdDTO) {
    const user = await this.userRepository.findOneBy({ id: dto.id });
    if (!user) throw new UserError.UserNotFound();

    return user;
  }
}
