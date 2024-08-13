import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as hbs from 'express-handlebars';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.setViewEngine('hbs');
  app.engine(
    'hbs',
    hbs({
      extname: 'hbs',
      partialsDir: join(__dirname, '..', 'views/partial'),
      defaultLayout: 'master',
      layoutsDir: join(__dirname, '..', 'views/layout'),
    }),
  );

  //  app.use(session({
  //   secret : 'Abc123_BB',
  //   resave : false,
  //   saveUninitialized : false,
  // }),
  //  );

  await app.listen(3500);
}
bootstrap();
