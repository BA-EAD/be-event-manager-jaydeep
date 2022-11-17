import { ApiProperty } from '@nestjs/swagger';
import {IsEmail,IsAlpha,IsNotEmpty, IsNumber,IsString} from 'class-validator';
 

export class ticketSchemaDto {
    @ApiProperty()
    @IsNotEmpty()
    name:string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price:number;   

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    quantity:number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    event:number

}