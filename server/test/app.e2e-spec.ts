import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/files (POST) 2 little files', () => {
    return request(app.getHttpServer())
      .post('/files')
      .set('Content-Type', 'multipart/form-data')
      .attach('files', './testFiles/littleFile1.txt')
      .attach('files', './testFiles/littleFile2.txt')
      .expect(201);
  });

  it('/files (POST) big file', () => {
    return request(app.getHttpServer())
      .post('/files')
      .set('Content-Type', 'multipart/form-data')
      .attach('files', './testFiles/bigFile.txt')
      .expect(413);
  })
});
