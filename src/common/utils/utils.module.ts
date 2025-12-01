import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { OpenmeteoService } from './openmeteo.service';

@Module({
  providers: [UtilsService,OpenmeteoService],
  exports: [UtilsService,OpenmeteoService], // Exporta ambos
})
export class UtilsModule {}