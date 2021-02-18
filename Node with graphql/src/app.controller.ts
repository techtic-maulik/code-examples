import { Controller, Get, UseGuards, Render, Post, Body, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';
import * as path from 'path';
import { applyDomino } from '@nestjs/ng-universal';
import { Response, Request } from 'express';
import { HttpAdapterHost } from '@nestjs/core';
import { request } from 'graphql-request'


@Controller()
export class AppController {
  constructor(

    private readonly httpAdapterHost: HttpAdapterHost
  ) {

  }

  @Get('/admin/*')
  admin() {
    console.log('AppController admin');
    console.log(path.resolve(process.cwd(), 'fuse-skeleton/dist/fuse/index.html'),'path');
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.resolve(process.cwd(), 'fuse-skeleton/dist/fuse/index.html'),
        'utf8',
        (err, data) => {
          if (err) {
            console.log(err,'err');
            reject(err);
            return;
          }
            console.log(data,'data');
          resolve(data);
        },
      );
    });
  }


  @Post('/api/coinbase')
  coinbaseWebhookResponse(@Body() item:any) {
    let requestData = {
      id: item.event.id,
      status: item.event.status
    }
    const query = `
      mutation webhookResponse($id: String!, $status: String!){
        data : webhookResponse(id: $id, status: $status){
          data
          message
        }
      }
    `;
    const variables = {
      id: '9381ccf0-e3f3-4523-8f9f-39856b1a1f5b',
    //  id: item.event.id,
     // status: item.event.status
      status: "success"
    }
    request('http://localhost:3000/graphql', query, variables).then(data => console.log(data))
  }


}
