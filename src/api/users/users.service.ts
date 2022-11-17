import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailerService } from "@nestjs-modules/mailer";
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly UserModule: Model<User>,private mailService:MailerService) {}

  // find user by email
  async findOne(email: string): Promise<User> {
    return await this.UserModule.findOne({ email: email })
      .populate('role')
      .exec();
  }

  /// create user
  async signUp(user: User): Promise<User> {
    const newUser = new this.UserModule(user);
    return await newUser.save();
  }

  // get all users
  async getAllUsers() {
    return await this.UserModule.find().exec();
  }

  // get user by id
  async getUserById(id: string): Promise<User> {
    return await this.UserModule.findOne({ _id: id }).exec();
  }

  async plainEmail(payload:any){
    await this.mailService.sendMail({
     to:payload.toemail,
     from:"mtdeshanivanmali@gmail.com",
     subject:payload.subject,
     text:payload.message,
     cc:payload.cc
    });
    return 'An Email send successfully!!'
 }

 async findOneByEmailOnly(email:string):Promise<User>{
  return await this.UserModule.findOne({email:email}).populate("role").exec();
 
}
async findByEmail(email:string,otps:any):Promise<User>{
  var otp:number=parseInt(otps)
 let userdata:any= await this.UserModule.findOne({email:email}).exec();
 if(userdata){    
  if(otp){
      userdata.otp=otp
  }
  userdata.save()
  return userdata
 }else{
  return null
 }
}

async findByEmailAndOtp(email:string,otps:any):Promise<User>{
  var otp:number=parseInt(otps)
 let userdata= await this.UserModule.findOne({email:email,otp:otp}).exec();
 if(userdata) return userdata
 else return null
}
async findByEmailAndUpdatePassword(email:string,password:any):Promise<User>{
 let userdata= await this.UserModule.findOne({email:email}).exec();
 if(userdata){    
  if(password){
      userdata.password=password
  }
  userdata.save()
  return userdata
 }else{
  return null
 }
}
}
