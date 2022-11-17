
import { ApiProperty } from '@nestjs/swagger';
import {IsEmail,IsAlpha,IsNotEmpty, IsNumber,IsString,IsDate} from 'class-validator';
 

export class evemtSchemaDto {
    

    @ApiProperty()
    @IsNotEmpty()
    name:string

    @ApiProperty()
    @IsNotEmpty()
    slug:string

   

    @ApiProperty()
    @IsString()
    description:string

    @ApiProperty()
    @IsNumber()
    poster:string

    @ApiProperty()
    @IsDate()
    @IsNumber()
    start_date:Date

    @ApiProperty()
    @IsDate()
    @IsNumber()
    end_date:Date

}
// 