

import { ApiProperty } from '@nestjs/swagger';
import {IsEmail,IsAlpha,IsNotEmpty, IsNumber,IsString,IsDate} from 'class-validator';
 

export class orderSchemaDto {
    

    @ApiProperty()
    @IsNotEmpty()
    owner:string

    @ApiProperty()
    @IsNotEmpty()
    ticket:string

   

    @ApiProperty()
    @IsDate()
    date:Date

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity:number

    @ApiProperty()
    @IsString()
    @IsNumber()
    total_price:string

}