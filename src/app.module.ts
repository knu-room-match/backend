import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { SurveyModule } from './survey/survey.module';
import { DatabaseModule } from './common/database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';

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
    AuthModule,
    EmailModule,
  ],
})
export class AppModule {}
