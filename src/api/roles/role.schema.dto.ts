import { ApiProperty } from '@nestjs/swagger';
import {IsEmail,IsAlpha,IsNotEmpty, IsNumber,IsString} from 'class-validator';
 

export class roleSchemaDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    type:string;   

    @ApiProperty()
    @IsNotEmpty()
    permission:any


}