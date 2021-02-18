import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TopicDTO {

    @ApiProperty()
    @IsNotEmpty()
    level_id: number;
    
}
