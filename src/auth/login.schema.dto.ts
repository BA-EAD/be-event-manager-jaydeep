import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty,IsEmail, IsNumber,IsString} from 'class-validator';
 

export class userLoginDto {
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password:string

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email:string



}