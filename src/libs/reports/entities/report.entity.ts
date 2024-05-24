import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AutoMap } from '@automapper/classes';
import { UserEntity } from '@libs/users/entities/user.entity';

@Entity()
export class ReportEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @AutoMap()
  id: string;

  @Column({ type: 'float8' })
  @AutoMap()
  lat: number;

  @Column({ type: 'float8' })
  @AutoMap()
  lon: number;

  @Column({ name: 'geo_hash' })
  @AutoMap()
  geoHash: string;

  @Column({ name: 'image_url' })
  @AutoMap()
  imageUrl: string;

  @Column({ name: 'reported_by_id' })
  @AutoMap()
  reportedById: string;

  @Column()
  @AutoMap()
  category: string;

  @Column()
  @AutoMap()
  condition: string;

  @CreateDateColumn({ name: 'created_at' })
  @AutoMap()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @AutoMap()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @AutoMap()
  deletedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.reports, { eager: true })
  @JoinColumn({ name: 'reported_by_id' })
  @AutoMap()
  user: UserEntity;
}
