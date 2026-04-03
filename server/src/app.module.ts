import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { supabaseConfig } from "./config/supabase.config.js";
import { ThrottlerModule } from "@nestjs/throttler";
import { AuthModule } from "./auth/auth.module.js";
import { UserModule } from "./user/user.module.js";
import { EnrollModule } from "./enroll/enroll.module.js";
import { WpPostsModule } from './wp-posts/wp-posts.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 100 }],
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    TypeOrmModule.forRoot(supabaseConfig),
    AuthModule,
    UserModule,
    EnrollModule,
    WpPostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
