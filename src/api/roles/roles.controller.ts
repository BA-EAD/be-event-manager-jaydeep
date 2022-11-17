import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Put,
  Delete,
  Body,
  UseGuards,
  Header
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';
import { FamilyRole } from '../../auth/role.enum';
import { Roles } from '../../auth/roles.decorator';
import { roleSchemaDto } from './role.schema.dto';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller({
  path: 'roles',
  version: '1',
})
export class RolesController {
  constructor(private readonly service: RolesService) {}


  // create user role
  @ApiOperation({
    operationId: 'Register User Role',
    summary: 'Create a role for user.',
  })
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: roleSchemaDto,
    description: 'Role data structure',
  })
  @Roles(FamilyRole.Admin, {
    create: true,
    delete: true,
    update: true,
    list: true,
  })
  async addRole(@Body() bodyData: any): Promise<any> {
    var name: string = bodyData.name;
    var type: string = bodyData.type;
    var permission: any = bodyData.permission;
    let requestObject = await this.service.create(name, type, permission);
    return requestObject;
  }

   // update user role
   @ApiOperation({
    operationId: 'Update User Role',
    summary: 'Update a role for user.',
  })
  @Patch('/:id')
  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(FamilyRole.Admin, {
    create: true,
    delete: true,
    update: true,
    list: true,
  })
  async updateRole(
    @Param('id') id: string,
    @Body() bodyData: any,
  ): Promise<any> {
    var name: string = bodyData.name;
    var type: string = bodyData.type;
    var permission: any = bodyData.permission;
    await this.service.update(id, name, type, permission);
    return null;
  }

  // update user role
  @ApiOperation({
    operationId: 'Get All Roles',
    summary: 'Load all user roles',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(FamilyRole.Admin, {
    create: true,
    delete: true,
    update: true,
    list: true,
  })
  async loadAll(): Promise<any> {
    let requestObject = await this.service.getAll();
    if (requestObject) return { ...requestObject };
    return { status: 400, data: requestObject, Message: 'No data found' };
  }


  
  // update user role
  @ApiOperation({
    operationId: 'Get role by id',
    summary: 'Get role details by id',
  })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(FamilyRole.Admin, {
    create: true,
    delete: true,
    update: true,
    list: true,
  })
  async getrByid(@Param('id') id: string): Promise<any> {
    let requestObject = await this.service.getById(id);
    return requestObject;
  }


   // update user role
   @ApiOperation({
    operationId: 'Delete role by id',
    summary: 'Delete role details by id',
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles(FamilyRole.Admin, {
    create: true,
    delete: true,
    update: true,
    list: true,
  })
  async deleteRole(@Param('id') id: string): Promise<any> {
    await this.service.delete(id);
    return null;
  }
}
