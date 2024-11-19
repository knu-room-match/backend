import { Module, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

const logger = new Logger('MysqlModule');

@Module({
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'knu_match',
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        });

        try {
          await dataSource.initialize();
          logger.log('Database connected successfully');
        } catch (error) {
          logger.error(
            'Database connection failed: ' + error.message,
            error.stack,
          );
        }

        return dataSource;
      },
    },
  ],
  exports: [DataSource],
})
export class MysqlModule {}
