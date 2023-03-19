import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  HttpCode,
  Res,
} from '@nestjs/common';
import { UrlEntry } from '@prisma/client';
import { Response } from 'express';
import { CreateUrlEntityDto } from './dto/create-url-entity.dto';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}
  @Post()
  async create(@Body() createUrlEntityDto: CreateUrlEntityDto) {
    const urlEntity = await this.urlService.create(createUrlEntityDto.url);
    return urlEntity;
  }

  @Get(':shortUrlKey')
  @HttpCode(302)
  async findOne(
    @Param('shortUrlKey') shortUrlKey: string,
    @Res() res: Response,
  ) {
    const url = await this.urlService.findOne(shortUrlKey);
    const originalUrl = url?.originalUrl;
    return res.redirect(originalUrl as string);
  }
}
