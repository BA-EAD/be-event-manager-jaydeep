import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { JoiValidationPipe } from '../../pipes/joi.validation.pipe';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';
import { createTicketScema } from './ticket.schema';
import { TicketsService } from './tickets.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ticketSchemaDto } from './ticket.schema.dto';
@ApiTags('Tickets')
@ApiBearerAuth()
@Controller({
  path: 'ticket',
  version: '1',
})
export class TiketsController {
  constructor(private readonly service: TicketsService) {}

  // Create Ticket
  @ApiOperation({
    operationId: 'Create Ticket',
    summary: 'Create an Ticket.',
  })
  @ApiBody({
    type: ticketSchemaDto,
    description: 'Ticket data structure',
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(createTicketScema))
  async addticket(@Body() ticketData, @Res() res: Response): Promise<any> {
    try {
      const savedTicket = await this.service.create(ticketData);
      res.status(200).json(savedTicket);
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  }

  // get all ticket list
  @ApiOperation({
    operationId: 'Get all Tickets',
    summary: 'Get all Ticket list.',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  // @Roles(FamilyRole.Admin, FamilyRole.User, { list: true }) //  Role based auth permission
  async loadAllTickets(@Req() req, @Res() res: Response): Promise<any> {
    try {
      const users = await this.service.getAll();
      res.json({ data: users });
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  }

  // get ticket by id
  @ApiOperation({
    operationId: 'Get Ticket by id',
    summary: 'Get Ticket from id.',
  })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  // @Roles(FamilyRole.Admin, { list: true })
  async getById(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      const ticket = await this.service.getById(id);
      res.json({ item: ticket });
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  }
}
