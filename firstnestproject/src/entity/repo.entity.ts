import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('repos')
export class Repo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  language: string;

  @Column({ type: 'boolean', default: false })
  fork: boolean;

  @Column({ type: 'integer', default: 0 })
  forks: number;

  @Column({ type: 'integer', default: 0, name: 'forks_count' })
  forks_count: number;

  @Column({
    type: 'timestamp with time zone',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
}
