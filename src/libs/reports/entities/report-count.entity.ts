import { Column, Entity, PrimaryColumn } from 'typeorm';

import { AutoMap } from '@automapper/classes';

@Entity()
export class ReportCountEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'user_count', default: 0 })
  @AutoMap()
  userCount: 0;

  @Column({ name: 'report_count', default: 0 })
  @AutoMap()
  reportCount: 0;

  @Column({ name: 'good_report_count', default: 0 })
  @AutoMap()
  goodReportCount: 0;

  @Column({ name: 'bad_report_count', default: 0 })
  @AutoMap()
  badReportCount: 0;
}
