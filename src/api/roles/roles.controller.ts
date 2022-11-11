import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Put,
  Delete,
  Body,
  NotFoundException,
  BadGatewayException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';
import { FamilyRole } from '../../auth/role.enum';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { RolesService } from './roles.service';
@Controller({
  path: 'roles',
  version: '1',
})
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(FamilyRole.Admin, {
    create: true,
    delete: true,
    update: true,
    list: true,
  })
  async addticket(@Body() bodyData: any): Promise<any> {
    var name: string = bodyData.name;
    var type: string = bodyData.type;
    var permission: any = bodyData.permission;
    let requestObject = await this.service.create(name, type, permission);
    // return {id:requestObject}
    return requestObject;
  }
  @Patch('/:id')
  @Put('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(FamilyRole.Admin, {
    create: true,
    delete: true,
    update: true,
    list: true,
  })
  async updateTicket(
    @Param('id') id: string,
    @Body() bodyData: any,
  ): Promise<any> {
    var name: string = bodyData.name;
    var type: string = bodyData.type;
    var permission: any = bodyData.permission;
    await this.service.update(id, name, type, permission);
    return null;
  }
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(FamilyRole.Admin, {
    create: true,
    delete: true,
    update: true,
    list: true,
  })
  async loadAllTickets(): Promise<any> {
    let requestObject = await this.service.getAll();
    if (requestObject) return { ...requestObject };
    return { status: 400, data: requestObject, Message: 'No data found' };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(FamilyRole.Admin, {
    create: true,
    delete: true,
    update: true,
    list: true,
  })
  async deleteTicket(@Param('id') id: string): Promise<any> {
    await this.service.delete(id);
    return null;
  }
}
