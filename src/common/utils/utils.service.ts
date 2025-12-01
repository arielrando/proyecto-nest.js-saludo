import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  isOnlyLetters(value: string): boolean {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/;
    return regex.test(value);
  }
}