import { getRepository, Repository } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PostsEntity } from 'src/posts/posts.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  /**
   * 创建用户
   * @param createUser
   * @returns
   */
  async register(createUser: CreateUserDto) {
    const { username } = createUser;
    const isExist = await this.userRepository.findOne({ where: { username } });
    if (isExist) {
      throw new HttpException('该用户名已存在', 500);
    }

    const user = await this.userRepository.create(createUser);
    await this.userRepository.save(user); //插入数据
    return;
  }

  async findAll(query) {
    const qb = await getRepository(User).createQueryBuilder('user');
    qb.where('1 = 1');
    qb.orderBy('user.create_time', 'DESC');

    const total = await qb.getCount();
    const { pageSize = 20, pageNum = 1 } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));
    const list = await qb.getMany();
    return {
      list,
      pageNum,
      pageSize,
      total,
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    console.log('user', user);

    if (!user) {
      throw new HttpException('用户不存在', 500);
    }
    return user;
  }
}
