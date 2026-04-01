import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import dotenv from "dotenv";
import { Enroll } from "../enroll/entities/enroll.entity.js";
import { User } from "../user/entities/user.entity.js";
dotenv.config();

const SUPABASE_PASSWORD = process.env.SUPABASE_PASSWORD;
const SUPABASE_USER = process.env.SUPABASE_USER || "postgres";

if (!SUPABASE_PASSWORD || typeof SUPABASE_PASSWORD !== "string") {
  throw new Error(
    "SUPABASE_PASSWORD is not set in environment variables. Using default password.",
  );
}

export const supabaseConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "db.nlmdiuaapsyrfqplzfiq.supabase.co",
  port: process.env.SUPABASE_PORT ? parseInt(process.env.SUPABASE_PORT) : 5432,
  username: SUPABASE_USER,
  password: SUPABASE_PASSWORD,
  database: "postgres",
  entities: [User, Enroll],
  synchronize: true,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  extra: {
    max: 20,
    connectionTimeoutMillis: 2000,
  },
  migrations: ["src/migrations/*.ts"],
};
