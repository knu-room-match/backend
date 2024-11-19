import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const logger = new Logger('MysqlModule');

@Module({
  imports: [
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
})
export class MysqlModule {
  constructor() {
    logger.log('Mysql connection established successfully');
  }
}
