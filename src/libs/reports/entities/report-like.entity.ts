import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '@libs/users/entities/user.entity';

import { ReportEntity } from './report.entity';

@Entity()
export class ReportLikeEntity {
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @PrimaryColumn({ name: 'report_id' })
  reportId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, default: null })
  deletedAt: Date | null;

  @ManyToOne(() => ReportEntity, (report) => report.likes)
  @JoinColumn({ name: 'report_id' })
  report: ReportEntity;

  @ManyToOne(() => UserEntity, (user) => user.likes)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
