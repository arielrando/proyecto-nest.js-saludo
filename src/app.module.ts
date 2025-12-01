import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WelcomeModule } from './modules/welcome/welcome.module';

@Module({
  imports: [WelcomeModule],
  controllers: [AppController]
})
export class AppModule {}