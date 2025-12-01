import { Module, NestModule, MiddlewareConsumer,RequestMethod } from '@nestjs/common';
import { WelcomeController } from './welcome.controller';
import { WelcomeService } from './welcome.service';
import { UtilsModule } from '../../common/utils/utils.module';
import { ValidateNameMiddleware } from '../../common/middlewares/valideteName.service';


@Module({
  imports: [UtilsModule],  
  controllers: [WelcomeController],
  providers: [WelcomeService],
})
export class WelcomeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateNameMiddleware)
      .forRoutes(
        { path: 'api/welcome', method: RequestMethod.GET },
        { path: 'api/welcome/:nombre', method: RequestMethod.GET },
        { path: 'api/welcome', method: RequestMethod.POST }
      ); // Aplica a todas las rutas de /welcome
  }
}