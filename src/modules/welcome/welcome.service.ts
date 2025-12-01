import { Injectable, Logger, HttpException, HttpStatus,  } from '@nestjs/common';
import { Request, Response } from 'express';
import { OpenmeteoService } from '../../common/utils/openmeteo.service';

@Injectable()
export class WelcomeService {
  private logger = new Logger(WelcomeService.name);

  constructor(
    private openmeteoService: OpenmeteoService
  ) {}

  async getWelcome(req: Request, res: Response) {
    try{
            const name = (req as any).validName;
            let nextSunTime = undefined;
            let welcomeType = 1;
            const formatter = new Intl.DateTimeFormat("en-CA", {timeZone: process.env.TIMEZONE, dateStyle: "short", timeStyle: "medium", hour12: false}).format(new Date());
            const now = new Date(formatter);
            const nowAux = now.getTime();
            try {
                nextSunTime = JSON.parse(req.cookies.nextSunTime);
            } catch {
                nextSunTime = undefined;
            }
            
            if (typeof nextSunTime !== 'undefined' && nextSunTime !== null && nowAux < nextSunTime.nextSunTime){
                welcomeType = nextSunTime.welcomeType;
            }else{
                const SunHours = await this.openmeteoService.getSunHours(res);
                welcomeType = SunHours.welcomeType;
            }

            const saludoTexto = (() => {
                switch (welcomeType) {
                    case 1:
                    default:
                    return "buenos días";
                    case 2:
                    return "buenas tardes";
                    case 3:
                    return "buenas noches";
                }
            })();
            return {success:true,message:`Hola ${name}, ${saludoTexto}`};
        }catch(err){
            this.logger.error(`Ocurrio un error, salgo por el catch ${String(err)}`);
            throw new HttpException({error: true,message: 'Error interno'},HttpStatus.INTERNAL_SERVER_ERROR);
        }
  }
}