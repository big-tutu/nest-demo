import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum PostsType {
  NONE = 'NONE',
}

@Entity('posts')
export class PostsEntity {
  @PrimaryGeneratedColumn() // id自动生产
  id: number; // 主列

  @Column({ length: 50 })
  title: string;

  @Column({ length: 20 })
  author: string;

  @Column('text')
  content: string;

  @Column({ default: '' })
  thumb_url?: string;

  @Column()
  type?: PostsType;

  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  create_time?: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  update_time?: Date;
}
