import { ConfigService } from './config.service';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { Brackets, SelectQueryBuilder, getConnection, In } from 'typeorm';
import { RelatuionQueryOption } from './class';
import _ from 'underscore';

const mime = require('mime');

export function baseUrl(path?: string) {
  return ConfigService.get('APP_URL') + (path ? '/' + path : '');
}
export function adminUrl(path?: string) {
  return ConfigService.get('ADMIN_URL') + (path ? '/' + path : '');
}
export function frontUrl(path?: string) {
  return ConfigService.get('FRONT_URL') + (path ? '/' + path : '');
}

export function becrypt(password: string) {
  return crypto.createHmac('sha256', password).digest('hex');
}

export async function bindDataTableQuery(input: any, query: any = {}) {
  query.where = query.where || [];
  let tablePath = query.expressionMap.aliases[0].name;

  if (input.filter) {

    if (input.filter_in) {
      query.andWhere(new Brackets((qb: any) => {
        for (let index = 0; index < input.filter_in.length; index++) {
          const filter = input.filter_in[index];

          switch (filter.name) {
            case "user.name":
              qb.orWhere(`EXISTS(SELECT * FROM user Where lower(CONCAT(first_name,' ', last_name)) LIKE  '%${input.filter}%' and user._id = ${tablePath}.user_id)`)
              continue;
              break;
            case "player.name":
              qb.orWhere(`EXISTS(SELECT * FROM user Where lower(CONCAT(first_name,' ', last_name)) LIKE  '%${input.filter}%' and user._id = ${tablePath}.player_id)`)
              continue;
              break;
            case "booking.name":
              qb.orWhere(`EXISTS(SELECT * FROM user Where lower(CONCAT(first_name,' ', last_name)) LIKE  '%${input.filter}%' and user._id = ${tablePath}.booking_user_id)`)
              continue;
              break;
            case "stake.name":
              qb.orWhere(`EXISTS(SELECT * FROM post Where lower(title) LIKE  '%${input.filter}%' and post._id = ${tablePath}.post_id)`)
              continue;
              break;
          }

          switch (filter.type) {
            case "int":
              let inputFilter = parseFloat(input.filter.replace(/[^0-9.-]+/g, ""));
              if (Number.isInteger(inputFilter)){
                qb.orWhere(`${filter.name} like '%${inputFilter}%'`)
              }
              break;
            default:
              qb.orWhere(`${filter.name} like '%${input.filter}%'`)
              break;
          }
        }
      }))
    }
  }

  if (input.order) {
    query.orderBy(input.order.name, input.order.direction == 'asc' ? 'ASC' : 'DESC')
  }
  return query;
}


export function downloadFile(url, path: string = "uploads"): Promise<string> {
  var http = require('https');
  return new Promise((resolve, reject) => {
    http.get(url, (resp) => {
      resp.setEncoding('base64');
      let body = "data:" + resp.headers["content-type"] + ";base64,";
      resp.on('data', (data) => { body += data });
      resp.on('end', () => {
        resolve(saveBase64Image(body, path));
      });
    }).on('error', () => {
      reject("");
    });
  });
}


export function saveBase64Image(dataString, path: string = "uploads"): string {
  let matches = dataString.match(/^data:(.+);base64,(.+)$/);

  let response: any = {};
  if (!matches || matches.length !== 3) {
    return null;
  }

  if (!fs.existsSync(path)) {
    const options:any = { recursive: true };
    fs.mkdirSync(path, options);
  }

  response.type = matches[1];
  response.data = Buffer.from(matches[2], 'base64');
  const ext = mime.getExtension(response.type);
  const file_name = (new Date()).getTime();
  const file_path: string = `server/public/${path}/${file_name}.${ext}`;
  const save_file_path: string = `public/${path}/${file_name}.${ext}`;

  fs.writeFile(file_path, response.data, 'base64', function (err) {
    if (err) throw err
  })

  return save_file_path;
}


export function toSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


export async function loadRelation<T>(query: SelectQueryBuilder<T>, type: any, option: RelatuionQueryOption){
  const data = await this.query.getMany();
  const connection = getConnection();
  const queryRepository = connection.getRepository<T>(type);
  const ids = _.pluck(data, '_id')
  return await queryRepository.find({ where: { '_id': In(ids) }, ...option });
}