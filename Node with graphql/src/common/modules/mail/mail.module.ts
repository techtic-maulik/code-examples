import { Module } from '@nestjs/common';
import { MailerModule } from '@nest-modules/mailer';
import { ConfigService } from '../../config.service';
import { join } from 'path';
import { NunjucksAdapter } from '../../../njk/nunjeks.adapter';
import { SharedModule } from '../../../shared/shared.module';

@Module({
    imports: [
        SharedModule,
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: `smtps://${ConfigService.get(
                    'MAIL_USERNAME',
                )}:${ConfigService.get('MAIL_PASSWORD')}@${ConfigService.get(
                    'MAIL_HOST',
                )}`,
                defaults: {
                    from: `"${ConfigService.get('MAIL_FROM_NAME')}" <${ConfigService.get(
                        'MAIL_FROM_EMAIL',
                    )}>`,
                },
                template: {
                    dir: join(process.cwd(), 'server/views/emails'),
                    adapter: new NunjucksAdapter(),
                    options: {
                        strict: false,
                    },
                },
            }),
        }),
    ],
    providers: [
    ]
})
export class MailModule { }
