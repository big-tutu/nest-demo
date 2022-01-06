import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 20 })
  username: string;

  @Column({ select: false }) // select 查询是默认隐藏
  password: string;

  @Column({ length: 20 })
  nickname: string;

  @Column({ default: '' })
  avatar: string;

  @Column({ default: '' })
  email: string;

  @Column('simple-enum', { enum: ['root', 'author', 'visitor'] })
  role: string;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @BeforeInsert() // 加密
  async encryptPwd() {
    // this.password = await bcrypt.hashSync(this.password);
  }
}
