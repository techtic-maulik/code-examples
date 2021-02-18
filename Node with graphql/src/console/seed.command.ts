import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedCommand {
    constructor(
        
    ) { }

    // autoExit defaults to `true`, but you can use `autoExit: false` if you need more control
    @Command({ command: 'db:seed <class>', describe: 'Seed database', autoExit: true })
    async seed(
        @Positional({
            name: 'class',
            describe: 'Seed class name',
            type: 'string',
        }) className: string,
    ) {

    }


    // autoExit defaults to `true`, but you can use `autoExit: false` if you need more control
    @Command({ command: 'make:seed <name>', describe: 'Make seed file', autoExit: true })
    async create(
        @Positional({
            name: 'name',
            describe: 'Seed name',
            type: 'string',
        }) name: string,
    ) {

    }
}