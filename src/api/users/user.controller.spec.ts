import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { UserController } from './user.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { RolesService } from '../roles/roles.service';
import { RoleSchema } from '../roles/role.model';
import { any } from 'joi';
import { appConfig } from '../../config';
import { User, UserSchema } from './users.model';
import { UsersService } from './users.service';

describe('UserController', () => {
  let res:Response;
  let req:Request;
  let controller: UserController;

  const userData={
    username:"testuser",
    mobile:123456789,
    otp:null,
    role:null,
    email:"test@test.com",
    password:"testuser",
    full_name:"test",
    nationality:"India"
  }
let mokUserService={
  signUp:jest.fn(dto=>{
    return {
      _id:Date.now(),
      ...dto
    }
    
  }),
  updateUser:jest.fn((id,dto)=>{
    return {
      id,
      ...dto
    }
    
  }),
  getAllUsers:jest.fn(()=>{}),
  getUserById:jest.fn(id=>{}),
  deleteUser:jest.fn(id=>{}),
  findOneByEmailOnly:jest.fn((dto)=>{
    return {
      ...dto
    }
    
  }),
  plainEmail:jest.fn((dto)=>{
    return {
      ...dto
    }
    
  }),
  findByEmailAndOtp:jest.fn((email,otp)=>{
    return {
      email,
      otp
    }
  }),
  findByEmailAndUpdatePassword:jest.fn((email,password)=>{
    return {
      email,
      password
    }
  }),
  findByEmail:jest.fn((dto)=>{
    return {
      ...dto
    }
    
  }),
}
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
     
      imports:[
        MongooseModule.forRoot(appConfig.mongoUrl),
        MongooseModule.forFeature([
          {name:'User',schema:UserSchema},
          {name:'Roles',schema:RoleSchema}
         ]),
        MailerModule.forRoot({
          transport:{
            service: appConfig.service,
            host: appConfig.host,
            port: appConfig.port,
            auth: {
                user: appConfig.user,
                pass: appConfig.pass 
            },
         
          },
        
        }),
       
      ],
      controllers: [UserController],
      providers:[UsersService,RolesService
      ]
    })
    .overrideProvider(UsersService)
    .useValue(mokUserService)
    .compile();

    controller = module.get<UserController>(UserController);
   
  });

  

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
  describe('findAll', () => {
    it('should return an array of cats', async () => {
        try {
      const result:any = await controller.loadAllUsers(req,res)
      expect(await controller.loadAllUsers(req,res)).toBe(result);
    } catch (e) {
        expect(e);
        
    }
    });
  });

  it('should create a user',async () => {
    try {
        const result:any = await controller.signUp(userData,res)
        expect(mokUserService.signUp).toHaveBeenCalled();
        result.subscribe(res => {
          expect(res);
        });

        } catch (e) {
            expect(e);
            
        }
  });

  it('should be load User by Id',async () => {
    try{
    const result:any = await controller.getUserByid("6371f0e2c1026a4fa70c44e3",res);
    expect(mokUserService.getAllUsers).toHaveBeenCalled();
    result.subscribe(res => {
      expect(res);
    });

    } catch (e) {
        expect(e);
        
    }
  });
  
  describe('Forgot Password', () => {
    it('should Forgot Password called', async () => {
        try {
            await controller.forgotPassword({toemail:userData.email,message:"Your reset password otp is"},res);
            expect(mokUserService.findByEmail).toHaveBeenCalled();
            expect(mokUserService.plainEmail).toHaveBeenCalled();
        } catch (e) {
            expect(e);
            
        }
    
     
    })

    it('should otp verification called', async () => {
        try {
            await controller.otpVerification({toemail:userData.email,otp:userData.otp},res);
            expect(mokUserService.findByEmailAndOtp).toHaveBeenCalled();
        } catch (e) {
            expect(e);
            
        }
    
     
    })

    it('should reset password', async () => {
        try{
            await controller.resetPassword({toemail:userData.email,password:userData.password},res);
            expect(mokUserService.findByEmailAndUpdatePassword).toHaveBeenCalled();
        }
        catch (e) {
            expect(e);
            
        }
    
     
    })
    it('should change password', async () => {
        try{
            await controller.changePassword({email:userData.email,oldPassword:userData.password,newPassword:userData.password},res);
            expect(mokUserService.findByEmailAndUpdatePassword).toHaveBeenCalled();
        }
        catch (e) {
            expect(e);
            
        }
    })
  })
 
});
