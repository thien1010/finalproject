import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PostLike {
  @PrimaryGeneratedColumn()
  like_id: number;

  @Column()
  user_id: number;

  @Column()
  post_id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  like_date: Date;
}
