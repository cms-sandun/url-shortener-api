import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { getRandomString } from 'src/utils/random';
import { UrlEntry, Prisma } from '@prisma/client';

@Injectable()
export class UrlService {
  constructor(private prismaService: PrismaService) {}

  async create(originalUrl: string): Promise<UrlEntry> {
    const shortUrlKey = getRandomString(10);
    return this.prismaService.urlEntry.create({
      data: {
        shortUrlKey,
        originalUrl,
      },
    });
  }

  async findOne(shortUrlKey: string): Promise<UrlEntry | null> {
    return this.prismaService.urlEntry.findFirst({
      where: {
        shortUrlKey,
      },
    });
  }
}
