import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, } from '@nestjs/config';
import { MailerModule } from '@nest-modules/mailer';
import { HandlebarsAdapter } from '@nest-modules/mailer';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormconfig from './ormconfig';
import { ConfigService as config } from './common/config.service';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { EmailService } from './shared/services/email/email.service';
import { TopicsModule } from './modules/topics/topics.module';
import { LevelModule } from './modules/level/level.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { UserModule } from './modules/user/user.module';
import { SimillarStatementsModule } from './modules/simillarStatements/simillarStatements.module';
import { SimillarStatementsQuizModule } from './modules/simillar-statements-quiz/simillarStatementsQuiz.module';
import { UserRecentHistoryModule } from './modules/user-recent-history/user-recent-history.module';

import { HttpExceptionFilter } from './shared/http-exception.filter';
import { AngularModule } from './modules/angular/angular.module';
import { DrawerModule } from './modules/drawer/drawer.module';
import { NotificationModule } from './modules/notification/notification.module';
import { HeaderModule } from './modules/header/header.module';
import { QuizHeaderModule } from './modules/quiz-header/quiz-header.module';
import { SettingModule } from './modules/setting/setting.module';
import { DrawerTypeModule } from './modules/drawer-type/drawer-type.module';
import { LevelTopicModule } from './modules/level-topic/level-module.module';

@Module({
    imports: [
        AngularModule.forRoot({
            rootPath: join(process.cwd(), 'backend/dist/fuse'),
            renderPath: '*',
        }),
        TypeOrmModule.forRoot(ormconfig),
        AuthModule,
        SharedModule.forRoot(),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [config],
            useFactory: async (configService: config) => ({
                transport: {
                    host: config.get('MAIL_HOST'),
                    port: config.get('MAIL_PORT'),
                    secure: false,
                    auth: {
                        user: config.get('MAIL_USERNAME'),
                        pass: config.get('MAIL_PASSWORD'),
                    },
                },
                defaults: {
                    forceEmbeddedImages: config.get('MAIL_EMBEDDED_IMAGES'),
                    from: `${config.get('APP_NAME')} <${config.get('MAIL_FROM_EMAIL')}>`,
                },
                template: {
                    dir: process.cwd() + '/views/email-templates',
                    adapter: new HandlebarsAdapter(), // or new PugAdapter()
                    options: {
                        strict: true,
                    },
                },
            }),
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TopicsModule,
        QuizModule,
        UserModule,
        LevelModule,
        SimillarStatementsModule,
        SimillarStatementsQuizModule,
        UserRecentHistoryModule,
        DrawerModule,
        NotificationModule,
        HeaderModule,
        QuizHeaderModule,
        SettingModule,
        DrawerTypeModule,
        LevelTopicModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        EmailService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
        // {
        //   provide: ConfigService,
        //   useValue: ConfigService.init(`.env`),
        // },
    ],
})
export class AppModule { }
