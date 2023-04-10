import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
    ) { }

    async create(post: Partial<Post>): Promise<Post> {
        return this.postRepository.save(post);
    }

    async findAll(): Promise<Post[]> {
        return this.postRepository.find();
    }

    async findOne(id: number): Promise<Post> {
        return this.postRepository.findOne({ where: { id } });
    }
    

    async update(id: number, post: Partial<Post>): Promise<Post> {
        await this.postRepository.update(id, post);
        const existingPost = await this.postRepository.findOne({ where: { id } });
        return existingPost;
    }
    


    async remove(id: number): Promise<void> {
        await this.postRepository.delete(id);
    }
}
