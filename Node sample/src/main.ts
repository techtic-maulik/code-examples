import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as admin from 'firebase-admin';

const API_PREFIX = "api";

const serviceAccount = require("../spanish-learner-4cfb7-firebase-adminsdk-phhvv-715cfe4b08.json");

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.setViewEngine('hbs');
	app.use(bodyParser.json({ limit: '50mb' }));
	app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
	app.enableCors();
	//app.setGlobalPrefix(API_PREFIX);

	app.useGlobalPipes(new ValidationPipe());
	app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/public' });
	app.useStaticAssets(join(process.cwd(), 'backend/dist/fuse'), { prefix: '/admin' });
	//app.useStaticAssets(join(process.cwd(), 'backend/dist/fuse/assets'), { prefix: '/admin' });

	// app.useStaticAssets(join(process.cwd(), 'server', 'public'), {
	//   index: false,
	//   prefix: '/public',
	//   maxAge: '1y',
	//   fallthrough: true
	// });

	const config = app.get(ConfigService);
	const port = config.get('APP_PORT');
	
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: "https://enjoy-spanish.firebaseio.com"
	});

	await app.listen(port).then(() => {
		console.log(`App listening on ${port || 3900}`);
	});
}
bootstrap();
