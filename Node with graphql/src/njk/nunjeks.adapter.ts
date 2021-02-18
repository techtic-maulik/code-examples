import * as path from 'path';
import * as nunjucks from 'nunjucks';
import { get } from 'lodash';
import { registerNjkHelper } from '.';

export class NunjucksAdapter {
  public compile(mail: any, callback: any, mailerOptions: any): void {
    const templateExt = path.extname(mail.data.template) || '.njk';
    const templateName = path.basename(
      mail.data.template,
      path.extname(mail.data.template),
    );
    const templateDir =
      path.dirname(mail.data.template) !== '.'
        ? path.dirname(mail.data.template)
        : get(mailerOptions, 'template.dir', '');
    const templatePath = path.join(templateDir, templateName + templateExt);

    try {
      let env = nunjucks.configure(templateDir);
      env = registerNjkHelper(env);
      mail.data.html = env.render(templatePath, mail.data.context);
    } catch (err) {
      return callback(err);
    }
    return callback();
  }
}
