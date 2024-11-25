import { redisConfig } from '@config/redis.config';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor() {
    const { host, port } = redisConfig();
    this.redisClient = new Redis({ host, port });
    this.checkConnection().then(console.log);
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async set(key: string, value: string, expireSeconds?: number): Promise<void> {
    if (expireSeconds) {
      await this.redisClient.set(key, value, 'EX', expireSeconds);
    } else {
      await this.redisClient.set(key, value);
    }
  }

  async del(key: string): Promise<number> {
    return this.redisClient.del(key);
  }

  async checkConnection(): Promise<string> {
    try {
      await this.redisClient.ping();
      return 'Redis connection is successful';
    } catch (error) {
      return `Redis connection failed: ${error.message}`;
    }
  }
}
