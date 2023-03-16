import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { getRandomString } from 'src/utils/random';
import { UrlEntry } from '@prisma/client';

@Injectable()
export class UrlService {
  constructor(private prismaService: PrismaService) {}

  async create(longUrl: string): Promise<UrlEntry> {
    const randomString = getRandomString(10);
    const shortUrl = `${process.env.BASE_URL}/${randomString}`;

    return this.prismaService.urlEntry.create({
      data: {
        shorUrl: shortUrl,
        originalUrl: longUrl,
      },
    });

    //Store in the db
    // Shorten url
    // Long url
    // Time stamp
    // Create a new url or update the existing one based on the env flag
  }

  findOne(shortUrl: string): string {
    // Count the number of hits also
    return 'longUrl';
  }
}
