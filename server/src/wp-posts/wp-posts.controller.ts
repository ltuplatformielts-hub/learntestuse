import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WpPostsService } from './wp-posts.service';
import { CreateWpPostDto } from './dto/create-wp-post.dto';
import { UpdateWpPostDto } from './dto/update-wp-post.dto';

@Controller('wp-posts')
export class WpPostsController {
  constructor(private readonly wpPostsService: WpPostsService) {}

  @Post()
  create(@Body() createWpPostDto: CreateWpPostDto) {
    return this.wpPostsService.create(createWpPostDto);
  }

  @Get()
  findAll() {
    return this.wpPostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wpPostsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWpPostDto: UpdateWpPostDto) {
    return this.wpPostsService.update(+id, updateWpPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wpPostsService.remove(+id);
  }
}
