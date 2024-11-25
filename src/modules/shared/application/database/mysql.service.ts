import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

const logger = new Logger('MysqlService');

@Injectable()
export class MysqlService {
  constructor(@InjectConnection() private readonly connection: Connection) {
    logger.log('Mysql connection established successfully');
  }
}
