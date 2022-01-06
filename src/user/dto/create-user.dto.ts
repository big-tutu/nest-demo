import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty({ message: '用户名称必填' })
  @ApiProperty({ description: '用户名称' })
  readonly username: string;

  @ApiPropertyOptional({ description: '用户邮箱' })
  readonly email: string;

  @IsNotEmpty({ message: '用户昵称必填' })
  @ApiProperty({ description: '用户昵称' })
  readonly nickname: string;

  @MinLength(8, { message: '密码不少于8位' })
  @IsNotEmpty({ message: '用户密码必填' })
  @ApiProperty({ description: '用户密码' })
  readonly password: string;

  @IsNotEmpty({ message: '用户角色必填' })
  @ApiProperty({ description: '用户角色' })
  readonly role: string;
}
