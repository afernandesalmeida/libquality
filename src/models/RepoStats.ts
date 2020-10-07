import { Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn } from "typeorm";
import Repo from './Repo';

@Entity('repo_stats')
class RepoStats {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Repo)
  @JoinColumn({ name: 'id' })
  @Column()
  id_repo: string;

  @Column()
  total_open_issues: number;

  @Column({ type: 'numeric', precision: 2, scale: 2 })
  avg_time_open_issues: number;

  @Column({ type: 'numeric', precision: 2, scale: 2 })
  std_open_issues: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default RepoStats;
