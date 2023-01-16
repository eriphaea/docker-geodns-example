import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'domainmetadata' })
@Index(['domain_id', 'kind'])
export class DomainMetaData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  domain_id: number;

  @Column({ length: 32 })
  kind: string;

  @Column({ type: 'text' })
  content: string;
}
