import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { bindDataTableQuery,saveBase64Image } from 'src/shared/helpers/utill';
import { Pagination } from 'src/shared/class';
import { Drawers } from 'src/modules/entity/drawer.entity';
import { pick } from "lodash"


@Injectable()
export class DrawerService {
    constructor(
        @InjectRepository(Drawers)
        private readonly drawersRepository: Repository<Drawers>,

    ) { }

    async get(request) {
        try {
            let response = await this.drawersRepository.findOne(
                {
                    where: {id: request.query.id}, 
                    relations: ['type', 'drawersStatement','drawersStatement.statment', 'drawersExample', 'drawersExample.example']
                }
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getAll(request){
        try {
            const query = await this.drawersRepository.createQueryBuilder('drawers');
            if(request.order != undefined &&request.order && request.order != ''){
                let order  = JSON.parse(request.order);
                query.orderBy(`${order.name}`, order.direction.toUpperCase());
            }else{
                query.orderBy('id', 'DESC');
            }

            if (request.filter && request.filter != '') {
                query.andWhere(`drawers.word LIKE :f`, { f: `%${request.filter}%` })
            }
            let limit = 10;

            if (request && request.limit) {
                limit = request.limit;
            }
            let page = 0;
            if (request && request.page) {
                page = request.page
            }

            request = pick(request, ['id', 'drawers_type_id', 'word', 'meaning', 'origin']);
            
            bindDataTableQuery(request, query);

            let response = await (new Pagination(query, Drawers).paginate(limit, page, { relations: ['type'] }));

            return response;
        } catch (error) {
            throw error;
        }
    }

    async createUpdate(payload): Promise<any> {
        
        try {
    
          let drawers = new Drawers();
          
          if (payload.drawers_type_id) {
            drawers.drawers_type_id = payload.drawers_type_id;
          }

          if (payload.word) {
            drawers.word = payload.word;
          }
              
          if (payload.meaning) {
            drawers.meaning = payload.meaning;
          }

          if (payload.image) {
            const path = saveBase64Image(payload.image, 'drawer');
            if (path) {
                drawers.image = path;
            }
          }         

          if (payload.origin) {
            drawers.origin = payload.origin;
          }
    
          if (payload.id) {
            let data = await this.drawersRepository.update(payload.id, drawers);
          } else {
            let data = await this.drawersRepository.save(drawers);
          }
    
          return 'success';
        } catch (error) {
          throw error;
        }
    }

    async delete(id) {
        await this.drawersRepository.softDelete({ id: id })
    }
}
