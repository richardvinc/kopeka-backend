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
  @AutoMap()
  @PrimaryColumn({ name: 'campaign_id' })
  campaignId: string;

  @AutoMap()
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @AutoMap()
  @Column({ name: 'is_creator', default: false })
  isCreator: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  @AutoMap()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
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

  @ManyToOne(() => CampaignEntity, (campaign) => campaign.memberships)
  campaign: CampaignEntity;

  @ManyToOne(() => CampaignEntity, (campaign) => campaign.memberships)
  member: CampaignEntity;
}
