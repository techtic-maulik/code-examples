import { ConfigService } from '../common/config.service';
import * as nunjucks from'nunjucks';

export function registerNjkHelper(env?: any) {
  if (env == undefined) {
    env = new nunjucks.Environment();
  }
  let config: any = ConfigService.getAll();
  env.addGlobal('config', (key: string) => {
    return config[key];
  });
  return env;
}
