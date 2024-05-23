import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AutoMap } from '@automapper/classes';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @AutoMap()
  id: string;

  @Column({ name: 'username', unique: true })
  @AutoMap()
  username: string;

  @Column({ name: 'firebase_uid', unique: true })
  @AutoMap()
  firebaseUid: string;

  @Column({ name: 'profile_picture_url' })
  @AutoMap()
  profilePictureUrl: string;

  @Column({ name: 'fcm_token', nullable: true })
  @AutoMap()
  fcmToken?: string;

  @Column({ default: true })
  @AutoMap()
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  @AutoMap()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @AutoMap()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @AutoMap()
  deletedAt: Date;
}
