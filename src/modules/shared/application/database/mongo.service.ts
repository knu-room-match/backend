import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

const logger = new Logger('MongoService');

@Injectable()
export class MongoService {
  constructor(@InjectConnection() private readonly connection: Connection) {
    logger.log('MongoDB connection established successfully');
  }
}
