import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlController } from './url/url.controller';
import { UrlService } from './url/url.service';

@Module({
  imports: [],
  controllers: [AppController, UrlController],
  providers: [AppService, UrlService, PrismaService],
})
export class AppModule {}
