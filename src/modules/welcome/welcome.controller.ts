import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { WelcomeService } from './welcome.service';

@Controller("welcome")
export class WelcomeController {
  constructor(private readonly WelcomeService: WelcomeService) {}

  @Get(":nombre")
  async getWelcome(@Req() req: Request, @Res() res: Response) {
    const result = await this.WelcomeService.getWelcome(req, res);
    res.json(result);
  }

  @Get()
  async getWelcomeQuery(@Req() req: Request, @Res() res: Response) {
    const result = await this.WelcomeService.getWelcome(req, res);
    res.json(result);
  }

  @Post()
  async getWelcomePost(@Req() req: Request, @Res() res: Response) {
    const result = await this.WelcomeService.getWelcome(req, res);
    res.json(result);
  }
}