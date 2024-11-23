import { Module } from '@nestjs/common';
import { ChatModule } from '@chat/chat.module';
import { SurveyModule } from '@survey/survey.module';
import { EmailModule } from '@email/email.module';
import { UserModule } from '@user/user.module';
import { DatabaseModule } from '@common/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    DatabaseModule,
    ChatModule,
    SurveyModule,
    UserModule,
    EmailModule,
  ],
})
export class AppModule {}
