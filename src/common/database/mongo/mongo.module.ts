import { MongooseModule } from '@nestjs/mongoose';
import { Module, Logger } from '@nestjs/common';

const logger = new Logger('MongoModule');

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/test')],
})
export class MongoModule {
  constructor() {
    logger.log('MongoDB connection established successfully');
  }
}
