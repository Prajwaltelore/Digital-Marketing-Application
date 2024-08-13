import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  index(@Res() res: Response) {
    return res.render('home');
  }

  @Get('/dashboard')
  dashboard(@Res() res: Response) {
    return res.render('dashboard');
  }

  @Get('/about')
  about(@Res() res: Response) {
    return res.render('about');
  }

  @Get('/contact')
  contact(@Res() res: Response) {
    return res.render('contact');
  }

  @Get('/service')
  service(@Res() res: Response) {
    return res.render('service');
  }

  @Get('/smm')
  social(@Res() res: Response) {
    return res.render('social-media');
  }

  @Get('/seo')
  search(@Res() res: Response) {
    return res.render('seo');
  }

  @Get('/login')
  get(@Res() res: Response) {
    return res.render('login');
  }

  @Get('/register')
  getRegister(@Res() res: Response) {
    return res.render('register');
  }

  @Get('/success')
  paymentSuccess(@Res() res: Response) {
    return res.render('success');
  }

  @Get('/fail')
  paymentfail(@Res() res: Response) {
    return res.render('fail');
  }
}
