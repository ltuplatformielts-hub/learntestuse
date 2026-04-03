import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import "dotenv/config.js";
import { WpPost } from "../wp-posts/entities/wp-post.entity.js";

export const mysqlConfig: TypeOrmModuleOptions = {
  name: "mysql",
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || "3306"),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [WpPost],
  synchronize: false,
  logging: true,
};
