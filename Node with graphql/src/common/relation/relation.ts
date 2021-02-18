import { SelectQueryBuilder } from "typeorm";

export interface IRelation{
    map(...attrs: SelectQueryBuilder<any>[]):Promise<any[]>;
}

export class Relation implements IRelation{
    async map(...attrs: SelectQueryBuilder<any>[] | any[]){
        let relations_data:any[] = [];

        for (let index = 0; index < attrs.length; index++) {
            const query:any = attrs[index];
            if (query instanceof SelectQueryBuilder){
                relations_data = await query.getMany();
            }else{

            }
        }

        return relations_data;
    }

    
}