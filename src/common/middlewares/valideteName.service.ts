import { Injectable, NestMiddleware, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class ValidateNameMiddleware implements NestMiddleware {
  private logger = new Logger(ValidateNameMiddleware.name);

  constructor(private utilsService: UtilsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const nombre = req.params.nombre ?? req.query.nombre ?? req.body.nombre;
    console.log('Middleware - req.params:', req.params);
    console.log('Middleware - req.query:', req.query);
    console.log('Middleware - nombre:', nombre);

    if (typeof nombre !== 'string' || nombre.trim() === '') {
      this.logger.error('No ingreso el nombre');
      throw new HttpException({error: true,message: 'No ingreso su nombre!'},HttpStatus.BAD_REQUEST);
    }

    if (!this.utilsService.isOnlyLetters(nombre)) {
      this.logger.error(`No se ingreso solo letras: ${nombre}`);
      throw new HttpException({error: true,message: 'El nombre solo puede contener letras!'},HttpStatus.BAD_REQUEST);
    }

    (req as any)['validName'] = nombre;
    next();
  }
}