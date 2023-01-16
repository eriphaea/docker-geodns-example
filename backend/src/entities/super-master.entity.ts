import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'supermasters' })
export class SuperMaster {
  @PrimaryColumn({ length: 25 })
  id: string;

  @Column({ nullable: false, length: 255 })
  nameserver: string;

  @Column({ default: null, length: 40 })
  account: string;
}
