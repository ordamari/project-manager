import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from './services/redis/redis.service';
import redisConfig from './config/redis.config';

@Module({
  imports: [ConfigModule.forFeature(redisConfig)],
  providers: [RedisService],
})
export class RedisModule {}
