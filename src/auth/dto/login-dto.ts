import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '用户名称' })
  @IsNotEmpty({ message: '用户名称必填' })
  username: string;

  @ApiProperty({ description: '用户密码' })
  @IsNotEmpty({ message: '用户密码必填' })
  password: string;
}
