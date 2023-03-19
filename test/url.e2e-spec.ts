import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UrlModule } from '../src/url/url.module';
import { PrismaService } from '../prisma/prisma.service';
import { UrlService } from '../src/url/url.service';
import { PrismaClient } from '@prisma/client';

describe('UrlController (e2e)', () => {
  let app: INestApplication;
  let prismaClient: PrismaClient;

  beforeAll(async () => {
    prismaClient = new PrismaClient();
    await prismaClient.$connect();

    prismaClient.urlEntry.create({
      data: {
        originalUrl: 'https://www.google.com',
        shortUrlKey: 'Xft6PHIe0R',
      },
    });
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UrlModule],
      providers: [PrismaService, UrlService],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    //TODO: create a test database and use it for testing
  });

  describe('create shorten url from original url', () => {
    it('should return url entity object with 201 response code for valid request body', () => {
      const originalUrl = 'https://www.google.com';
      return request(app.getHttpServer())
        .post('/url')
        .send({ url: originalUrl })
        .expect(201)
        .then((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('shortUrlKey');
          expect(res.body).toHaveProperty('originalUrl');
          expect(res.body).toHaveProperty('createdAt');

          expect(res.body.originalUrl).toBe(originalUrl);
          expect(res.body.shortUrlKey).toHaveLength(10);
        });
    });

    it('should return url 400 bad request for invalid request body', () => {
      const originalUrl = 'invalid url';
      return request(app.getHttpServer())
        .post('/url')
        .send({ url: originalUrl })
        .expect(400)
        .then((res) => {
          expect(res.body.message[0]).toEqual('url must be a URL address');
          expect(res.body.error).toEqual('Bad Request');
        });
    });
  });

  describe('get original url from shorten url', () => {
    it.only('should return url entity object with 200 response code for valid urlShortenKey', () => {
      const hortenlUrlKey = 'Xft6PHIe0R';
      return request(app.getHttpServer())
        .get(`/url/${hortenlUrlKey}`)
        .expect(302)
        .then((res) => {
          console.log(res.header.location);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
