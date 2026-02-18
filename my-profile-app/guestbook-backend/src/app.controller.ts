import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('guestbook')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getMessages() {
    return this.appService.getMessages();
  }

  @Post()
  async createMessage(@Body() body: { name: string; message: string }) {
    return this.appService.createMessage(body.name, body.message);
  }
}