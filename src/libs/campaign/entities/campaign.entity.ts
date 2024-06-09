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
import { UserEntity } from '@libs/users/entities/user.entity';

import { CampaignMembershipEntity } from './campaign-membership.entity';

@Entity('campaign')
export class CampaignEntity {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @AutoMap()
  @Column({ name: 'campaign_shortcode' })
  campaignShortcode: string;

  @AutoMap()
  @Column({ name: 'created_by_id' })
  createdById: string;

  @AutoMap()
  @Column({ name: 'expired_at' })
  expiredAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  @AutoMap()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @AutoMap()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, default: null })
  @AutoMap()
  deletedAt: Date | null;

  @ManyToOne(() => UserEntity, (user) => user.campaignCreated, { eager: true })
  @JoinColumn({ name: 'created_by_id' })
  @AutoMap()
  creator?: UserEntity;

  @OneToMany(
    () => CampaignMembershipEntity,
    (membership) => membership.campaign,
  )
  @JoinColumn({ name: 'id', referencedColumnName: 'campaignId' })
  memberships: CampaignMembershipEntity[];
}
