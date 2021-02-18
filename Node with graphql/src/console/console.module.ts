import { Module } from "@nestjs/common";
import { SeedCommand } from "./seed.command";
import { CommandModule } from "nestjs-command";

@Module({
    imports:[
        CommandModule
    ],
    providers: [
        SeedCommand
    ]
})
export class ConsoleModule {

}