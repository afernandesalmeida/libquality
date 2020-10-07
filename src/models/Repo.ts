import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity('repositories')
class Repos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_repository: number;

  @Column()
  name: string;

  @Column()
  full_name: string;

  @Column()
  description: string;

  @Column()
  avatar_url: string;

  @Column()
  html_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Repos;
