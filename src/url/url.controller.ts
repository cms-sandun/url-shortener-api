import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}
  @Post()
  async create(@Body() createUrlDto: CreateUrlDto) {
    const shortUrl = await this.urlService.create(createUrlDto.url);
    return shortUrl;
  }
}
