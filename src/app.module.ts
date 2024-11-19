import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { SurveyModule } from './survey/survey.module';
import { DatabaseModule } from './common/database/database.module';

@Module({
  imports: [ChatModule, SurveyModule, DatabaseModule],
})
export class AppModule {}
