import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/services/redis/redis.service';

export class InvalidatedRefreshTokenError extends Error {}

@Injectable()
export class RefreshTokenIdsStorage {
  @Inject(RedisService)
  private readonly redisService!: RedisService;
  async insert(userId: number, tokenId: string): Promise<void> {
    await this.redisService.redisClient.set(this.getKey(userId), tokenId);
  }

  async validate(userId: number, tokenId: string): Promise<boolean> {
    const storedId = await this.redisService.redisClient.get(
      this.getKey(userId),
    );
    if (storedId !== tokenId) {
      throw new InvalidatedRefreshTokenError();
    }
    return storedId === tokenId;
  }

  async invalidate(userId: number): Promise<void> {
    await this.redisService.redisClient.del(this.getKey(userId));
  }

  private getKey(userId: number): string {
    return `user-${userId}`;
  }
}
