import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AutoMap } from '@automapper/classes';
import { UserEntity } from '@libs/users/entities/user.entity';

import { CampaignEntity } from './campaign.entity';

@Entity({ name: 'campaign_membership' })
export class CampaignMembershipEntity {
  @AutoMap()
  @PrimaryColumn({ name: 'campaign_id', type: 'uuid' })
  campaignId: string;

  @AutoMap()
  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
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
  @JoinColumn({ name: 'campaign_id', referencedColumnName: 'id' })
  campaign: CampaignEntity;

  @ManyToOne(() => UserEntity, (user) => user.memberships)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  member: CampaignEntity;
}
