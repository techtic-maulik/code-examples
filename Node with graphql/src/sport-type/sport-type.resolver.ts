import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { SportType } from './sport-type.entity';
import { Pagination, PaginationResponse } from '../common/class';
import { SportTypeService } from '../shared/service/sport-type.service';

@Resolver('SportType')
export class SportTypeResolver {

    constructor(
        private readonly sportTypeService: SportTypeService,
    ) { }

    @Query(() => SportType)
    async sportTypes(@Args('input') input?: any): Promise<PaginationResponse<SportType>> {
        return this.sportTypeService.getAll(input);
    }


    @Query(() => SportType)
    async sportType(@Args('id') id: string) {
        return await this.sportTypeService.get(id);
    }

    @Mutation(() => SportType)
    async addSportType(@Args('input') input: SportType) {
        return await this.sportTypeService.createOrUpdate(input).then((data: SportType) => {
            return {
                data,
                message: `Sport Type has been successfully ${(input._id ? 'updated' : "added")}`,
            }
        });
    }

    @Mutation(() => SportType)
    async deleteSportType(@Args('id') id: string) {
        return await this.sportTypeService.delete(id).then((data) => {
            return {
                message: "Sport Type has been successfully deleted",
            }
        });
    }

    @Query(() => SportType)
    async getSportTypes() {
        return await this.sportTypeService.getSportTypes();
    }

    @Query(() => SportType)
    async getActiveSportTypes(@Args('type') type: any) {
        return await this.sportTypeService.getActiveSportTypes(type);
    }

    @Mutation(() => SportType)
    async updateSportOrder(@Args('input') input: any) {
        return await this.sportTypeService.updateSportOrder(input).then((data) => {
            return {
                message: `Sport Type Order Changed`,
            }
        });
    }
}
