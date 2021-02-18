import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { data } from './data';
import { Drawers } from 'src/modules/entity/drawer.entity';

@Injectable()
export class DrawerSeederService {
    /**
     * Create an instance of class.
     *
     * @constructs
     *
     * @param {Repository<Drawers>} DrawersRepository
     */
    constructor(
        @InjectRepository(Drawers)
        private readonly DrawersRepository: Repository<Drawers>,
        private readonly logger: Logger,
    ) { }

    async drawers() {
        return await Promise.all(this.create())
            .then(data => {
                // Can also use this.logger.verbose('...');
                this.logger.debug(
                    'No. of drawer created : ' +
                    // Remove all null values and return only created languages.
                    data.filter(
                        nullValueOrCreatedLanguage => nullValueOrCreatedLanguage,
                    ).length,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }
    /**
     * Seed all page tooltip.
     *
     * @function
     */
    create(): Array<Promise<any>> {
        return data.map(async drawer => {
            let levelData = await this.DrawersRepository.findOne(drawer);
            if (!levelData) {
                return Promise.resolve(
                    await this.DrawersRepository.save(this.DrawersRepository.create(drawer)),
                );
            }
            return levelData;
        });
    }
}
