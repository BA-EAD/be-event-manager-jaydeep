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

@Controller({
  path: 'event',
  version: '1',
})
export class EventController {
  constructor(private readonly service: EventService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(createEventScema))
  @UseInterceptors(
    FileInterceptor('upload', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, callback) => {
          const uniqecon = Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const fileName = `demo01${file.originalname}`; //`${uniqecon}${ext}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  async addEvent(
    @Body() eventData,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ): Promise<any> {
    // var slug: string = eventData.slug;
    // var name: string = eventData.name;
    // var description: string = eventData.description;

    // var start_date: Date = eventData.start_date;
    // var end_date: Date = eventData.end_date;
    // var tickets: any = eventData.tickets;
    const ext = extname(file.originalname);

    const fileName = `${new Date()}-${file.originalname}`;

    eventData.poster = fileName; /// file name

    try {
      const savedEvent = await this.service.addEvent(eventData);
      res.status(200).json(savedEvent);
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  }

  // get all events
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(FamilyRole.Admin, { list: true })
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(FamilyRole.Admin, { list: true })
  async getEventByid(@Param('id') id: string, res: Response): Promise<any> {
    try {
      const event = await this.service.getById(id);
      res.json({ item: event });
    } catch (error: any) {
      res.status(400).json({ message: error.message, stack: error.stack });
    }
  }
}
