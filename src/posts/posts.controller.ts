import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post';
import { PostsService } from './posts.service';
@ApiTags('POSTS')
@Controller('post')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @ApiOperation({ summary: '创建post' })
  @Post('create')
  async create(@Body() post: CreatePostDto) {
    return await this.postService.create(post);
  }

  @ApiOperation({ summary: '删除post' })
  @Post('delete/:id')
  async remove(@Param('id') id) {
    return await this.postService.remove(id);
  }

  @ApiOperation({ summary: '更新post' })
  @Post('update/:id')
  async update(@Param('id') id: number, @Body() post) {
    return await this.postService.update(id, post);
  }

  @ApiOperation({ summary: 'post 列表' })
  @Get('list')
  async getAll(@Query() query) {
    return await this.postService.findAll(query);
  }

  @ApiOperation({ summary: 'id查询post' })
  @Get(':id')
  async findById(@Param('id') id) {
    return await this.postService.findById(id);
  }
}
