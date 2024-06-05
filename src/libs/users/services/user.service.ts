import { Repository } from 'typeorm';

import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserDomain } from '../domains/user.domain';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectMapper()
    private mapper: Mapper,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserByFirebaseUid(firebaseUid: string): Promise<UserDomain | null> {
    this.logger.log(`START: getUserByFirebaseUid`);
    this.logger.log(`Getting user by firebaseUid: ${firebaseUid}`);
    const user = await this.userRepository
      .findOneBy({
        firebaseUid,
      })
      .catch((err) => {
        console.log('ERROR', err);
        return null;
      });

    this.logger.log(`END: getUserByFirebaseUid`);
    return user ? this.mapper.map(user, UserEntity, UserDomain) : null;
  }

  async getUserByUsername(username: string): Promise<UserDomain | null> {
    this.logger.log(`START: getUserByUsername`);
    this.logger.log(`Getting user by username: ${username}`);
    const user = await this.userRepository
      .findOne({
        where: { username },
        withDeleted: true,
      })
      .catch((err) => {
        console.log('ERROR', err);
        return null;
      });

    this.logger.log(`END: getUserByUsername`);
    return user ? this.mapper.map(user, UserEntity, UserDomain) : null;
  }

  async getUserById(userId: string): Promise<UserDomain | null> {
    this.logger.log(`START: getUserById`);
    this.logger.log(`Getting user by userId: ${userId}`);
    const user = await this.userRepository
      .findOneBy({
        id: userId,
      })
      .catch((err) => {
        console.log('ERROR', err);
        return null;
      });

    this.logger.log(`END: getUserById`);
    return user ? this.mapper.map(user, UserEntity, UserDomain) : null;
  }

  async updateUser(user: UserDomain): Promise<UserDomain | null> {
    this.logger.log(`START: updateUser`);
    this.logger.log(`Updating user with id: ${user.id}`);
    const userEntity = this.mapper.map(user, UserDomain, UserEntity);

    await this.userRepository.update(userEntity.id, userEntity);

    this.logger.log(`END: updateUser`);
    return userEntity
      ? this.mapper.map(userEntity, UserEntity, UserDomain)
      : null;
  }

  async createUser(user: UserDomain): Promise<UserDomain | null> {
    this.logger.log(`START: createUser`);
    this.logger.log(`Creating user with id: ${user.id}`);
    const userEntity = this.mapper.map(user, UserDomain, UserEntity);

    await this.userRepository.save(userEntity);

    this.logger.log(`END: createUser`);
    return userEntity
      ? this.mapper.map(userEntity, UserEntity, UserDomain)
      : null;
  }

  async createUserFromFirebase(
    firebaseUid: string,
    profilePictureUrl?: string,
  ): Promise<UserDomain> {
    this.logger.log(`START: createUserFromFirebase`);
    this.logger.log(`Creating user with firebaseUid: ${firebaseUid}`);
    const user = UserDomain.create({
      firebaseUid,
      isActive: true,
      profilePictureUrl,
    });

    const registeredUser = await this.userRepository.save(
      this.mapper.map(user, UserDomain, UserEntity),
    );

    this.logger.log(`END: createUserFromFirebase`);
    return this.mapper.map(registeredUser, UserEntity, UserDomain);
  }
}
