import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { bindDataTableQuery } from 'src/shared/helpers/utill';
import { Pagination } from 'src/shared/class';
import { DrawersType } from 'src/modules/entity/drawer_type.entity';
import { pick } from "lodash"


@Injectable()
export class DrawerTypeService {
    constructor(
        @InjectRepository(DrawersType)
        private readonly drawersTypeRepository: Repository<DrawersType>,

    ) { }
    async getDrawersTypeOptions(){

      return await this.drawersTypeRepository.find();
      
    }
    
    async getAll(request){
        try {
            const query = await this.drawersTypeRepository.createQueryBuilder('drawerType');
            if(request.order != undefined &&request.order && request.order != ''){
                let order  = JSON.parse(request.order);
                query.orderBy(`${order.name}`, order.direction.toUpperCase());
            }else{
                query.orderBy('id', 'DESC');
            }

            if (request.filter && request.filter != '') {
                query.andWhere(`drawerType.name LIKE :f`, { f: `%${request.filter}%` })
            }
            let limit = 10;

            if (request && request.limit) {
                limit = request.limit;
            }
            let page = 0;
            if (request && request.page) {
                page = request.page
            }

            request = pick(request, ['id', 'name', 'image']);
            
            bindDataTableQuery(request, query);

            let response = await (new Pagination(query, DrawersType).paginate(limit, page));

            return response;
        } catch (error) {
            throw error;
        }
    }

    async createUpdate(payload): Promise<any> {
        try {
    
          let drawersType = new DrawersType();
    
          if (payload.name) {
            drawersType.name = payload.name;
          }
              
          if (payload.color_code) {
            drawersType.color_code = payload.color_code;
          }
          
          if (payload.explanation) {
            drawersType.explanation = payload.explanation;
          }

          if (payload.id) {
            let data = await this.drawersTypeRepository.update(payload.id, drawersType);
          } else {
            let data = await this.drawersTypeRepository.save(drawersType);
          }
    
          return 'success';
        } catch (error) {
          throw error;
        }
    }

    async delete(id) {
        await this.drawersTypeRepository.softDelete({ id: id })
    }
}
