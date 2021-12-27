import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PostsType } from '../type';

export class CreatePostDto {
  @IsNotEmpty({ message: '文章标题必填' })
  @ApiProperty({ description: '文章标题' })
  readonly title: string;

  @IsNotEmpty({ message: '作者名称必填' })
  @ApiProperty({ description: '作者' })
  readonly author: string;

  @IsNotEmpty({ message: '文章内容必填' })
  @ApiPropertyOptional({ description: '文章内容' })
  readonly content: string;

  @ApiProperty({ description: '文章封面' })
  readonly thumbUrl: string;

  @ApiPropertyOptional({ description: '文章类型' })
  readonly type: PostsType;
}
