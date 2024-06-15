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
  @Column({ name: 'total_campaigners', default: 0, type: 'int' })
  totalCampaigners: number;

  @AutoMap()
  @Column({ name: 'total_reports', default: 0, type: 'int' })
  totalReports: number;

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
  @JoinColumn({ name: 'id', referencedColumnName: 'campaign_id' })
  memberships: CampaignMembershipEntity[];

  @OneToMany(() => UserEntity, (user) => user.activeCampaign)
  @JoinColumn({ name: 'id', referencedColumnName: 'active_campaign_id' })
  activeCampaigners: UserEntity[];
}
