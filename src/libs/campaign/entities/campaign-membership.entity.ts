import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AutoMap } from '@automapper/classes';

import { CampaignEntity } from './campaign.entity';

@Entity({ name: 'campaign_membership' })
export class CampaignMembershipEntity {
  @PrimaryColumn({ name: 'campaign_id' })
  campaignId: string;

  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @AutoMap()
  @Column({ name: 'is_creator', default: false })
  isCreator: boolean;

  @CreateDateColumn({ name: 'created_at' })
  @AutoMap()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @AutoMap()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, default: null })
  @AutoMap()
  deletedAt: Date | null;

  @ManyToOne(() => CampaignEntity, (campaign) => campaign.memberships)
  campaign: CampaignEntity;

  @ManyToOne(() => CampaignEntity, (campaign) => campaign.memberships)
  member: CampaignEntity;
}
