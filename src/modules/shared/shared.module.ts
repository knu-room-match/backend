import { Global, Module } from '@nestjs/common';
import { MysqlService } from '@shared/application/database/mysql.service';
import { MongoService } from '@shared/application/database/mongo.service';
import { DatabaseModule } from '@shared/infrastructure/database/database.module';
import { RedisService } from '@shared/application/redis/redis.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [DatabaseModule, ConfigModule],
  providers: [MysqlService, MongoService, RedisService],
  exports: [MysqlService, MongoService, RedisService],
})
export class SharedModule {}
