import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Column({ name: 'active_campaign_id', nullable: true, default: null })
  @AutoMap()
  activeCampaignId?: string;

  @Column({ name: 'is_active', default: true })
  @AutoMap()
  isActive: boolean;

  @Column({ name: 'is_admin', default: false })
  @AutoMap()
  isAdmin: boolean;

  @Column({ name: 'is_onboarded', default: false })
  @AutoMap()
  isOnboarded: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  @AutoMap()
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: true,
    default: null,
  })
  @AutoMap()
  updatedAt?: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    default: null,
  })
  @AutoMap()
  deletedAt?: Date;

  @OneToMany(() => ReportEntity, (report) => report.user)
  @JoinColumn({ name: 'id', referencedColumnName: 'reported_by_id' })
  reports: ReportEntity[];

  @OneToMany(() => ReportLikeEntity, (like) => like.report)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  likes: ReportLikeEntity[];

  @OneToMany(() => CampaignEntity, (campaign) => campaign.creator)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  campaignCreated: CampaignEntity[];

  @OneToMany(() => CampaignMembershipEntity, (campaign) => campaign.member)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  memberships: CampaignMembershipEntity[];

  @ManyToOne(() => CampaignEntity, (campaign) => campaign.activeCampaigners)
  @JoinColumn({ name: 'active_campaign_id', referencedColumnName: 'id' })
  activeCampaign?: CampaignEntity | null;
}
