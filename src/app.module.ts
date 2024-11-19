import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { SurveyModule } from './survey/survey.module';
import { DatabaseModule } from './common/database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, ChatModule, SurveyModule, UserModule],
})
export class AppModule {}
