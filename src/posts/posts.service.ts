import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { PostsEntity } from './posts.entity';

export interface IAllPosts {
  list: PostsEntity[];
  count: number;
  pageSize: number;
  pageNum: number;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postsRepository: Repository<PostsEntity>,
  ) {}

  /**
   * 创建逻辑
   * @param post
   */
  async create(post: Partial<PostsEntity>): Promise<PostsEntity> {
    const { title, author } = post;
    if (!title) {
      throw new HttpException('缺少文章标题', 500);
    }
    if (!author) {
      throw new HttpException('作者不能为空', 500);
    }
    const isExist = await this.postsRepository.findOne({ where: { title } });
    if (isExist) {
      throw new HttpException('已存在相同标题的文章', 500);
    }

    return await this.postsRepository.save(post);
  }

  /**
   * 获取文章列表
   * @param query
   */
  async findAll(query): Promise<IAllPosts> {
    const qb = await getRepository(PostsEntity).createQueryBuilder('post');
    qb.where('1 = 1');
    qb.orderBy('post.create_time', 'DESC');
    const count = await qb.getCount();
    const { pageNum = 1, pageSize = 10 } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * (pageNum - 1));
    const list = await qb.getMany();
    return {
      count,
      list,
      pageSize,
      pageNum,
    };
  }

  /**
   * 更具ID查询
   * @param id
   * @returns
   */
  async findById(id: number): Promise<PostsEntity> {
    const post = await this.postsRepository.findOne(id);
    if (!post) {
      throw new HttpException(`id为 ${id} 的文章不存在`, 500);
    }
    return post;
  }

  /**
   * 更新操作
   * @param post
   * @returns
   */
  async update(id: number, post: PostsEntity): Promise<PostsEntity> {
    const updatePost = await this.postsRepository.merge(
      await this.findById(id),
      post,
    );
    return await this.postsRepository.save(updatePost);
  }

  /**
   * 删除
   * @param id
   * @returns
   */
  async remove(id: number): Promise<PostsEntity> {
    return await this.postsRepository.remove(await this.findById(id));
  }
}
