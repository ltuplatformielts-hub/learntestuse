import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const SUPABASE_PASSWORD = process.env.SUPABASE_PASSWORD;

if (!SUPABASE_PASSWORD) {
  console.error(
    "SUPABASE_PASSWORD is not set in environment variables. Using default password.",
  );
}

export const supabaseConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "db.nlmdiuaapsyrfqplzfiq.supabase.co",
  port: process.env.SUPABASE_PORT ? parseInt(process.env.SUPABASE_PORT) : 5432,
  username: "postgres",
  password: SUPABASE_PASSWORD,
  database: "postgres",
  entities: [__dirname + "/../**/*.supabase.entity{.ts,.js}"],
  ssl: {
    rejectUnauthorized: false,
  },
  extra: {
    max: 20,
    connectionTimeoutMillis: 2000,
  },
};
