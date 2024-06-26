import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AutoMap } from '@automapper/classes';
import { VirtualColumn } from '@libs/shared/decorators/typeorm/virtual-column.decorator';
import { UserEntity } from '@libs/users/entities/user.entity';

import { ReportLikeEntity } from './report-like.entity';

@Entity()
export class ReportEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @AutoMap()
  id: string;

  @Column({ type: 'float8', default: 0 })
  @AutoMap()
  latitude: number;

  @Column({ type: 'float8', default: 0 })
  @AutoMap()
  longitude: number;

  @Column({ name: 'geo_hash' })
  @AutoMap()
  geoHash: string;

  @Column({ name: 'image_url' })
  @AutoMap()
  imageUrl: string;

  @Column({ name: 'reaction_count', default: 0 })
  @AutoMap()
  totalReaction: 0;

  @Column({ name: 'reported_by_id' })
  @AutoMap()
  reportedById: string;

  @Column({ name: 'campaign_id', nullable: true })
  @AutoMap()
  campaignId?: string;

  @Column()
  @AutoMap()
  category: string;

  @Column({
    name: 'category_remark',
    type: 'text',
    nullable: true,
    default: null,
  })
  @AutoMap()
  categoryRemark?: string;

  @Column({
    name: 'sub_categories',
    type: 'text',
    array: true,
    nullable: true,
  })
  @AutoMap()
  subCategories?: string[];

  @Column({
    name: 'sub_category_remark',
    type: 'text',
    nullable: true,
    default: null,
  })
  @AutoMap()
  subCategoryRemark?: string;

  @Column()
  @AutoMap()
  condition: string;

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

  @Column({ name: 'row_id' })
  @Generated('increment')
  @AutoMap()
  rowId: number;

  @VirtualColumn()
  @AutoMap()
  isReacted: boolean;

  @ManyToOne(() => UserEntity, (user) => user.reports, { eager: true })
  @JoinColumn({ name: 'reported_by_id' })
  @AutoMap()
  user: UserEntity;

  @OneToMany(() => ReportLikeEntity, (like) => like.report)
  @JoinColumn({ name: 'id', referencedColumnName: 'reportId' })
  likes: ReportLikeEntity[];
}
