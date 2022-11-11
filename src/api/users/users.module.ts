import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { RolesModule } from '../roles/roles.module';

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    RolesModule,
  ],
  providers: [UsersService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
