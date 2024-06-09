import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AutoMap } from '@automapper/classes';
import { CampaignMembershipEntity } from '@libs/campaign/entities/campaign-membership.entity';
import { CampaignEntity } from '@libs/campaign/entities/campaign.entity';
import { ReportLikeEntity } from '@libs/reports/entities/report-like.entity';
import { ReportEntity } from '@libs/reports/entities/report.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @AutoMap()
  id: string;

  @Column({ name: 'username', nullable: true })
  @AutoMap()
  username?: string;

  @Column({ name: 'firebase_uid', unique: true })
  @AutoMap()
  firebaseUid: string;

  @Column({ name: 'profile_picture_url', nullable: true })
  @AutoMap()
  profilePictureUrl?: string;

  @Column({ name: 'fcm_token', nullable: true })
  @AutoMap()
  fcmToken?: string;

  @Column({ name: 'is_active', default: true })
  @AutoMap()
  isActive: boolean;

  @Column({ name: 'is_onboarded', default: false })
  @AutoMap()
  isOnboarded: boolean;

  @CreateDateColumn({ name: 'created_at' })
  @AutoMap()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @AutoMap()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @AutoMap()
  deletedAt: Date;

  @OneToMany(() => ReportEntity, (report) => report.user)
  @JoinColumn({ name: 'id', referencedColumnName: 'reportedById' })
  reports: ReportEntity[];

  @OneToMany(() => ReportLikeEntity, (like) => like.report)
  @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
  likes: ReportLikeEntity[];

  @OneToMany(() => CampaignEntity, (campaign) => campaign.creator)
  @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
  campaignCreated: CampaignEntity[];

  @OneToMany(() => CampaignMembershipEntity, (campaign) => campaign.member)
  @JoinColumn({ name: 'id', referencedColumnName: 'userId' })
  memberships: CampaignMembershipEntity[];
}
