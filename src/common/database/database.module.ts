import { Module } from '@nestjs/common';
import { MysqlModule } from './mysql/mysql.module';
import { MongoModule } from './mongo/mongo.module';
@Module({
  providers: [],
  imports: [MysqlModule, MongoModule],
  exports: [MysqlModule, MongoModule],
})
export class DatabaseModule {}
