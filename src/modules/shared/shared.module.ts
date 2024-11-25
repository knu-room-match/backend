import { Global, Module } from '@nestjs/common';
import { MysqlService } from '@shared/application/database/mysql.service';
import { MongoService } from '@shared/application/database/mongo.service';
import { DatabaseModule } from '@shared/infrastructure/database/database.module';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [MysqlService, MongoService],
  exports: [MysqlService, MongoService],
})
export class SharedModule {}
