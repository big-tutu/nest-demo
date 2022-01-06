import { Repository } from 'typeorm';
import { PassportStrategy } from '@nestjs/passport';
import { compareSync } from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { IStrategyOptions, Strategy } from 'passport-local';
import { User } from 'src/user/entities/user.entity';

/**
 * 首先定义了一个LocalStorage继承至@nestjs/passport提供的PassportStrategy类, 接受两个参数
 * 第一个参数: Strategy，你要用的策略，这里是passport-local
 * 第二个参数:是策略别名，上面是passport-local,默认就是local
 * 接着调用super传递策略参数， 这里如果传入的就是username和password，可以不用写，使用默认的参数就是，比如我们是用邮箱进行验证，传入的参数是email, 那usernameField对应的value就是email。
 */
export class LocalStorage extends PassportStrategy(Strategy, 'local') {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  /**
   * 登录信息验证用户查询及密码对比校验
   * @param username
   * @param password
   * @returns
   */
  async validate(username: string, password: string) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password') // 添加 password 查询，否则无法做密码比对
      .where('user.username=:username', { username })
      .getOne();
    if (!user) {
      throw new BadRequestException('用户名称不存在！');
    }

    if (password !== user.password) {
      throw new BadRequestException('密码错误！');
    }

    return user;
  }
}
