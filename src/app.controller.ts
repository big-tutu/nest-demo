import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

export interface IUserInfo {
  userName: string;
  userId: number;
}

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('list')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('create')
  create(): string {
    return "It's ok!";
  }
  @Get('user')
  getUser(): IUserInfo {
    return {
      userId: 1,
      userName: 'kyrie',
    };
  }
}
