import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'knu_match',
      entities: [__dirname + '../../../../**/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  exports: [MongooseModule, TypeOrmModule],
})
export class DatabaseModule {}
