import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PostsType } from './type';

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
  thumbUrl?: string;

  @Column()
  type?: PostsType;

  @Column({
    name: 'create_time',
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  createTime?: Date;

  @Column({
    name: 'update_time',
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  updateTime?: Date;
}
