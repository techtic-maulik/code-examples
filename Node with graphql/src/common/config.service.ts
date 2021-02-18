import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { join } from 'path';

dotenv.config();

let p_cwd = process.cwd();
let path:any;
if (p_cwd.indexOf('server') >= 0){
  path = fs.readFileSync(join(process.cwd(), '.env'))
} else {
  path = fs.readFileSync(join(process.cwd(), 'server', '.env'))
}

export class ConfigService {
  
  private static envConfig: { [key: string]: string } = dotenv.parse(path);

  static init(filePath: string) {
    ConfigService.envConfig = dotenv.parse(fs.readFileSync(filePath));
    return ConfigService;
  }

  static get(key: string): any {
    return ConfigService.envConfig[key];
  }

  static getAll(): any {
    return ConfigService.envConfig;
  }
}
