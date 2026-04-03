import { PartialType } from '@nestjs/mapped-types';
import { CreateWpPostDto } from './create-wp-post.dto';

export class UpdateWpPostDto extends PartialType(CreateWpPostDto) {}
