import { ApiProperty } from '@nestjs/swagger';
import {IsEmail,IsAlpha,IsNotEmpty, IsNumber,IsString} from 'class-validator';
 

export class userResitrationDto {
    
    @ApiProperty()
    @IsEmail()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    name:string

    @ApiProperty()
    @IsNotEmpty()
    username:string

    @ApiProperty()
    @IsNumber()
    mobile:number

    @ApiProperty()
    @IsNotEmpty()
    password:string

    @ApiProperty()
    @IsString()
    full_name:string

    @ApiProperty()
    @IsString()
    nationality:string

    @ApiProperty()
    @IsNotEmpty()
    role:string

}

export class useremailDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email:string

}

export class useremailAndOtpCheckDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    toemail:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    otp:string
}

export class useremailAndPasswordDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    toemail:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password:string
}

export class userChangePasswordDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    oldPassword:string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    newPassword:string

}