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
    const user = await this.userRepository
      .findOneBy({
        firebaseUid,
      })
      .catch((err) => {
        console.log('ERROR', err);
        return null;
      });

    return user ? this.mapper.map(user, UserEntity, UserDomain) : null;
  }

  async createUserFromFirebase(
    firebaseUid: string,
    profilePictureUrl?: string,
  ): Promise<UserDomain> {
    const user = UserDomain.create({
      firebaseUid,
      isActive: true,
      profilePictureUrl,
    });

    const registeredUser = await this.userRepository.save(
      this.mapper.map(user, UserDomain, UserEntity),
    );

    return this.mapper.map(registeredUser, UserEntity, UserDomain);
  }
}
