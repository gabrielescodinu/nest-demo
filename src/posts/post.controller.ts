import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Post as PostEntity } from './post.entity';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async create(@Body() post: Partial<PostEntity>): Promise<PostEntity> {
    return this.postService.create(post);
  }

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PostEntity> {
    return this.postService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() post: Partial<PostEntity>): Promise<PostEntity> {
    return this.postService.update(id, post);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.postService.remove(id);
  }
}
