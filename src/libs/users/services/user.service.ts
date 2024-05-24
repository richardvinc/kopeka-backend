import { Repository } from 'typeorm';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserDomain } from '../domains/user.domain';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserByFirebaseUid(firebaseUid: string): Promise<UserDomain | null> {
    const user = await this.userRepository.findOne({
      where: { firebaseUid },
    });

    return this.mapper.map(user, UserEntity, UserDomain);
  }
}
