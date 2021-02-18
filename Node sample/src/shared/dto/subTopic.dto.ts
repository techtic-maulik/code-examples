import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SubTopicDTO {

    @ApiProperty()
    @IsNotEmpty()
    subtopic_id: number;
    
}
