import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import {MongooseModule} from "@nestjs/mongoose";
import { RoleSchema } from './role.model';
import { JwtService } from '@nestjs/jwt';
@Module({
  controllers: [RolesController],
  imports:[MongooseModule.forFeature([
    {name:'Roles',schema:RoleSchema}
  ])],
  providers: [RolesService,JwtService],
  exports:[RolesService]
})
export class RolesModule {}
