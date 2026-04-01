import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { supabaseConfig } from "./config/supabase.config.js";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    TypeOrmModule.forRoot(supabaseConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
