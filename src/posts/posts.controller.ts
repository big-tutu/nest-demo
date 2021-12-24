import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('post')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Post('create')
  async create(@Body() post) {
    return await this.postService.create(post);
  }

  @Post('delete/:id')
  async remove(@Param('id') id) {
    console.log('delete', id);

    return await this.postService.remove(id);
  }

  @Post('update/:id')
  async update(@Param('id') id: number, @Body() post) {
    return await this.postService.update(id, post);
  }

  @Get('list')
  async getAll(@Query() query) {
    return await this.postService.findAll(query);
  }

  @Get(':id')
  async findById(@Param('id') id) {
    return await this.postService.findById(id);
  }
}
