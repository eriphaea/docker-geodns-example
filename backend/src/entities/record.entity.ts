import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'records' })
@Index(['name', 'type'])
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ default: null })
  domain_id?: number;

  @Index()
  @Column({ nullable: false, length: 255 })
  name: string;

  @Column({ nullable: false, length: 6 })
  type: string;

  @Column({ nullable: false, length: 255 })
  content: string;

  @Column({ default: null })
  ttl?: number;

  @Column({ default: null })
  prio?: number;

  @Column({ default: false })
  disabled: boolean;

  @Column({ length: 255, default: null })
  ordername?: string;

  @Column({ default: true })
  auth: boolean;
}
