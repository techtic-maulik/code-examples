import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationExceptionFilter } from './common/Exception/validation.exception.filter';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { NextFunction, Request, Response } from 'express';
var cookieParser = require('cookie-parser')
declare const module: any;

const getLoggerForStatusCode = (statusCode: number) => {
  if (statusCode >= 500) {
    return console.error.bind(console)
  }
  if (statusCode >= 400) {
    return console.warn.bind(console)
  }

  return console.log.bind(console)
}


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // let env = nunjucks.configure('./views', {
  //   express: app,
  //   autoescape: true,
  // });
  // registerNjkHelper(env);
  // app.set('view engine', 'html');


  const logRequestStart = (req: Request, res: Response, next: NextFunction) => {
    console.info(`${req.method} ${req.originalUrl}`)

    const cleanup = () => {
      res.removeListener('finish', logFn)
      res.removeListener('close', abortFn)
      res.removeListener('error', errorFn)
    }

    const logFn = () => {
      cleanup()
      const logger = getLoggerForStatusCode(res.statusCode)
      logger(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`)
    }

    const abortFn = () => {
      cleanup()
      console.warn('Request aborted by the client')
    }

    const errorFn = err => {
      cleanup()
      console.error(`Request pipeline error: ${err}`)
    }

    res.on('finish', logFn) // successful pipeline (regardless of its response)
    res.on('close', abortFn) // aborted pipeline
    res.on('error', errorFn) // pipeline internal error

    next()
  }

  app.use(logRequestStart)


  //app.useStaticAssets(join(process.cwd(), 'backend/dist/browser'), { prefix: '/admin' });
  app.useStaticAssets(join(process.cwd(), 'fuse-skeleton/dist/fuse'), { 
    prefix: '/admin' 
  });
  app.useStaticAssets(join(process.cwd(), 'server', 'public'), { 
    index: false,
    prefix: '/public',
    maxAge: '1y',
    fallthrough: true
   });

  app.useStaticAssets(join(process.cwd(), 'dist/browser'), {
    index: false,
    maxAge: '1y'
  });


  app.setBaseViewsDir(join(process.cwd(), 'server', 'views'));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ValidationExceptionFilter());

  app.use(bodyParser.json({ limit: '50mb' }));

  app.use(cookieParser())


  // app.get('*.*', express.static(join(process.cwd(), 'dist/browser'), {
  //   maxAge: '1m'
  // }));


  app.enableCors();



  //app.setGlobalPrefix('api');

  let server = await app
    .listen(3000)
    .then((server) => {
      console.log('Server listening on 3000 port')
      return server;
    });

  server.setTimeout(10000)

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap().catch(err => console.error(err));;
