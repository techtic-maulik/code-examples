import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, Validate } from 'class-validator';
import { IsUserAlreadyExist } from '../../shared/validations/IsUserAlreadyExistValidator';

export class RegisterDTO {
         id: string;
         @ApiProperty({
           required: false,
         })
         @IsEmail()
         @Validate(IsUserAlreadyExist)
         @IsNotEmpty({
           message: 'The email should not be empty',
         })
         email: string;

         @ApiProperty({
           required: true,
         })
         @IsNotEmpty({
           message: 'The first name should not be empty',
         })
         first_name: string;

         @ApiProperty({
           required: true,
         })
         @IsNotEmpty({
           message: 'The last name should not be empty',
         })
         last_name: string;

         @ApiProperty({
           required: true,
         })
         @IsNotEmpty({
           message: 'The password should not be empty',
         })
         @MinLength(8)
         password: string;

         @ApiProperty({
           required: true,
         })
         device_token: string;

         @ApiProperty({
           required: true,
         })
         device_type: string;

         @ApiProperty({
           required: true,
         })
         user_type: string;
         country_id: number;
}
