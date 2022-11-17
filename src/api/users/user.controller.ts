import {
  Controller,
  UseGuards,
  Post,
  Get,
  Param,
  Body,
  UsePipes,
  Req,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { JoiValidationPipe } from '../../pipes/joi.validation.pipe';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';
import { createUserScema } from './user.shema';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { userChangePasswordDto, useremailAndOtpCheckDto, useremailAndPasswordDto, useremailDto, userResitrationDto } from './user-registration.schema.dto';
import { emailValidationSchema } from '../../auth/ValidationSchema/emailvalidation.schema';
import { changePassSchema } from '../../auth/ValidationSchema/changePasswors.shema';
import { checkOtpSchema } from '../../auth/ValidationSchema/checkotp.schema';
import { emailSchema } from '../../auth/ValidationSchema/email.schema';

@ApiTags('Users')
@ApiBearerAuth()
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(
    private readonly service: UsersService, // private role: RolesService,
  ) {}

  // create user
  @ApiOperation({
    operationId: 'Register User',
    summary: 'Create an user account.',
  })
  @ApiBody({
    type: userResitrationDto,
    description: 'User data structure',
  })
    
  @Post()

  @UsePipes(new JoiValidationPipe(createUserScema))
  async signUp(@Body() userData, @Res() res: Response): Promise<any> {
    try {
      const savedUser = await this.service.signUp(userData);
      res.status(200).json(savedUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  }

  // get all users
  @ApiOperation({
    operationId: 'Get All User list',
    summary: 'Get all user list',
  })
  @Get()
  // @UseGuards(JwtAuthGuard)
  async loadAllUsers(@Req() req, @Res() res: Response): Promise<any> {
    try {
      const users = await this.service.getAllUsers();
      res.json({ data: users });
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  }

  // get user by id
  @ApiOperation({
    operationId: 'Get user by id',
    summary: 'Get user from id',
  })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserByid(@Param('id') id: string, res: Response): Promise<any> {
    try {
      console.log("---------------------- ",id);
      
      const user = await this.service.getUserById(id);
      res.json({ item: user });
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  }



  //  Auth
//  Forget password
  @Post('/forgot-password')
  @ApiOperation({
    operationId: 'Send an email for reset password',
    summary: 'Send an email for reset password',
  })
  @ApiBody({
    type: useremailDto,
    description: 'Email structure',
  })
  @UsePipes(new JoiValidationPipe(emailValidationSchema))
  async forgotPassword( @Body() bodyData:any,res: Response):Promise<any>{

    try {
      const uniqecon:any=Math.floor(Math.random()*90000) + 10000;
      let userDetails=await this.service.findByEmail(bodyData.toemail,uniqecon);
      if(userDetails==null){
        res.status(401).json({status:false,message:"Email not registered"})          
      }else{
          bodyData['message']=`Your reset password OTP is ${uniqecon}`
          bodyData['subject']=`Reset Password`
         let requestObject=await this.service.plainEmail(bodyData);
         res.status(400).json({success:true,message:`Your reset password OTP is send on your email address pelase check inbox or spam`});
      }
    } catch (error) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  }


  //  reset password
  @Post('/check-otp')
  @ApiOperation({
    operationId: 'Check OTP for reset password',
    summary: 'Check OTP to reset password',
  })
  @ApiBody({
    type: useremailAndOtpCheckDto,
    description: 'Email structure',
  })
  @UsePipes(new JoiValidationPipe(checkOtpSchema))
  async otpVerification( @Body() bodyData:any,res: Response):Promise<any>{

    try {
     
      let userDetails=await this.service.findByEmailAndOtp(bodyData.toemail,bodyData.otp);
      if(userDetails==null){
          throw new NotFoundException("OTP dose not match !")          
      }else{
          
        res.json( {success:true,message:`OTP is matched with your profile`,data:userDetails});
      }
     
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }

    
  }

  
  //  reset password
  @Post('/reset-password')
  @ApiOperation({
    operationId: 'Reset password',
    summary: 'Reset user password',
  })
  @ApiBody({
    type: useremailAndPasswordDto,
    description: 'Email structure',
  })
  @UsePipes(new JoiValidationPipe(emailSchema))
  async resetPassword( @Body() bodyData:any,res: Response):Promise<any>{
    try{
      let userDetails=await this.service.findByEmailAndUpdatePassword(bodyData.toemail,bodyData.password);
      if(userDetails==null){
          res.json({status:401,message:"Email not register with this account"});
      }else{
          res.json({success:true,message:`Password changed successfully!!`});
      }
    }  
    catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
     
  }

   //  change password
   @Post('/change-password')
   @ApiOperation({
    operationId: 'Change password',
    summary: 'Change user password',
  })
  @ApiBody({
    type: userChangePasswordDto,
    description: 'Email structure',
  })
   @UsePipes(new JoiValidationPipe(changePassSchema))
   async changePassword( @Body() bodyData:any,res: Response):Promise<any>{
    try {
      let userDetails=await this.service.findOneByEmailOnly(bodyData.email)
      if(userDetails==null){
          res.json({success:false,message:`Email not register with this account`})        
      }else{
         if(userDetails.password!=bodyData.oldPassword){
             res.json({success:false,message:`Old Password done not matched`});
         }
         let password:string=bodyData.newPassword
         await this.service.findByEmailAndUpdatePassword(bodyData.email,password);
         res.json({success:true,message:`Password changed successfully!!`})
      }
      
    } catch (error) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
     
   }
}
