import { Module } from '@nestjs/common';
import { WelcomeModule } from './modules/welcome/welcome.module';

@Module({
  imports: [WelcomeModule]
})
export class AppModule {}