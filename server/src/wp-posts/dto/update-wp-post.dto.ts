import { PartialType } from "@nestjs/mapped-types";
import { CreateWpPostDto } from "./create-wp-post.dto.js";

export class UpdateWpPostDto extends PartialType(CreateWpPostDto) {}
