import {
  UploadedFile,
  Controller,
  UseGuards,
  Post,
  Get,
  Param,
  Body,
  Res,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth-guard';
import { FamilyRole } from '../../auth/role.enum';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { EventService } from './event.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { createEventScema } from './event.shema';
import { JoiValidationPipe } from 'src/auth/joi.validation.pipe';
import { UsePipes } from '@nestjs/common/decorators';
import { Response } from 'express';
import * as moment from 'moment';

@Controller({
  path: 'event',
  version: '1',
})
export class EventController {
  constructor(private readonly service: EventService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  // @UsePipes(new JoiValidationPipe(createEventScema))
  @UseInterceptors(
    FileInterceptor('poster', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, poster, callback) => {
          const fileName = `${Date.now()}-${poster.originalname}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  async addEvent(
    @Body() eventData,
    @UploadedFile() poster: Express.Multer.File,
    @Res() res: Response,
  ): Promise<any> {
    try {
      eventData.poster = poster?.filename;
      eventData.start_date = moment(eventData.start_date).utc(); // date convert to utc
      eventData.end_date = moment(eventData.end_date).utc(); // date convert to utc

      // slug validate
      const event = await this.service.getBySlug(eventData.slug);
      if (event && event._id) {
        res.status(400).json({ message: 'Slug should be unique' });
        return;
      }

      const savedEvent = await this.service.addEvent(eventData);
      res.status(200).json(savedEvent);
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  }

  // get all events
  @Get()
  @UseGuards(JwtAuthGuard)
  // @Roles(FamilyRole.Admin, { list: true })
  async loadAllEvets(@Req() req, @Res() res: Response): Promise<any> {
    try {
      const events = await this.service.getAllEvents();
      res.json({ data: events });
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  }

  // get Event by id
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  // @Roles(FamilyRole.Admin, { list: true })
  async getEventByid(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const event = await this.service.getById(id);
      res.json({ item: event });
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  }
}
