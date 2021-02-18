import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQlModule } from './common/modules/graph-ql/graph-ql.module';
import { Module, MiddlewareConsumer, OnModuleInit } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigService } from './common/config.service';
import { SportTypeModule } from './sport-type/sport-type.module';
import { MailModule } from './common/modules/mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppResolver } from './app.resolver';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './common/modules/auth';
import { PostModule } from './post/post.module';
import { WalletModule } from './wallet/wallet.module';
import { RequestMiddleware } from './middlewares/request.middleware';
import { PostUserModule } from './post/post-user.module';
import { SettingsModule } from './setting/setting.module';
import { NotificationModule } from './notification/notification.module';
import { EmailTemplateModule } from './email-template/email-template.module';
import { NotificationTemplateModule } from './notification-template/notification-template.module';
import { FaqModule } from './faq/faq.module';
import { PagesModule } from './pages/pages.module';
import { TutorialModule } from './tutorial/tutorial.module';
import { ChatModule } from './chat/chat.module';
import ormconfig from './ormconfig';
import { SupportTicketModule } from './support-ticket/support-ticket.module';
import { InvoiceModule } from './invoice/invoice.module';
import { applyDomino } from '@nestjs/ng-universal';
import { join } from 'path';
import { HttpAdapterHost } from '@nestjs/core';
import 'localstorage-polyfill';
import { StatisticsModule } from './statistics/statistics.module';
import { UserFollowModule } from './user-follow/user-follow.module';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { APP_BASE_HREF } from '@angular/common';
//import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';

declare let global:any;


@Module({
  imports: [
    GraphQlModule,
    AuthModule.forRoot(),
    UserModule.forRoot(),
    SportTypeModule.forRoot(),
    PostModule.forRoot(),
    MailModule,
    TypeOrmModule.forRoot(ormconfig),
    SharedModule.forRoot(),
    WalletModule,
    PostUserModule,
    SettingsModule,
    FaqModule,
    PagesModule,
    NotificationModule,
    EmailTemplateModule.forRoot(),
    NotificationTemplateModule.forRoot(),
    ChatModule,
    InvoiceModule,
    TutorialModule,
    SupportTicketModule,
    StatisticsModule,
    UserFollowModule
  //  UserAvailabity
  ],
  exports: [
    UserModule,
    SportTypeModule,
    EmailTemplateModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,
    {
      provide: ConfigService,
      useValue: ConfigService.init(`.env`),
    },
  ],
})
export class AppModule implements OnModuleInit {

  constructor(
    private readonly httpAdapterHost: HttpAdapterHost
  ) {
    console.log('constructor');
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware);
    //consumer.apply(CookieParserMiddleware).forRoutes();
  }


  

  async onModuleInit() {
    if (!this.httpAdapterHost) {
      return;
    }
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    if (!httpAdapter) {
      return;
    }

    try {
      const BROWSER_DIR = join(process.cwd(), 'dist/browser');
      const templatePath = join(BROWSER_DIR, 'index.html');
      const app = httpAdapter.getInstance();
      const { AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap } = require(join(process.cwd(), 'dist/server/main'));

      app.engine('html', ngExpressEngine({
        bootstrap: AppServerModuleNgFactory,
        providers: [
          provideModuleMap(LAZY_MODULE_MAP),
        ]
      }));

      app.set('view engine', 'html');
      app.set('views', BROWSER_DIR);
      applyDomino(global, templatePath);
      app.get('*', (req, res) => {
        global['navigator'] = req['headers']['user-agent'];
        const http = req.headers['x-forwarded-proto'] === undefined ? 'http' : req.headers['x-forwarded-proto'];


        console.log("server cookies", req.cookies);
     
        res.render(templatePath, { 
          req: req,
          res: res,
          providers: [
            { provide: APP_BASE_HREF, useValue: req.baseUrl },
            {
              provide: REQUEST,
              useValue: req,
            },
            {
              provide: RESPONSE,
              useValue: res,
            },
            {
              provide: 'ORIGIN_URL',
              useValue: `${http}://${req.headers.host}`,
            },
          ]
        })
      });
    } catch (error) {
      console.log('onModuleInit', error);
    }    
  }
}
