import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'domains' })
export class Domain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 255, unique: true })
  name: string;

  @Column({ default: null, length: 128 })
  master?: string;

  @Column({ default: null })
  last_check?: number;

  @Column({ nullable: false, length: 6 })
  type: string;

  @Column({ default: null })
  notified_serial?: number;

  @Column({ default: null, length: 40 })
  account?: string;

  @Column({ type: 'text', default: null })
  options?: string;

  @Column({ length: 255, default: null })
  catalog?: string;
}
