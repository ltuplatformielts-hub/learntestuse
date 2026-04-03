import { Injectable } from '@nestjs/common';
import { CreateWpPostDto } from './dto/create-wp-post.dto';
import { UpdateWpPostDto } from './dto/update-wp-post.dto';

@Injectable()
export class WpPostsService {
  create(createWpPostDto: CreateWpPostDto) {
    return 'This action adds a new wpPost';
  }

  findAll() {
    return `This action returns all wpPosts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wpPost`;
  }

  update(id: number, updateWpPostDto: UpdateWpPostDto) {
    return `This action updates a #${id} wpPost`;
  }

  remove(id: number) {
    return `This action removes a #${id} wpPost`;
  }
}
