import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(404);
  });

  const testUser = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.person.fullName(),
  };

  describe('/auth/register (POST)', () => {
    it('should register a new user and return an access_token', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201)
        .expect((res) => {
          expect(res.body).toBeDefined();
          expect(res.body).toHaveProperty('access_token');
          expect(res.body).toHaveProperty('id');
          expect(res.body.email).toEqual(testUser.email.toLowerCase());
          expect(res.body.name).toEqual(testUser.name);
        });
    });
  });

  let access_token: string;
  let user_id: string;
  describe('/auth/login (POST)', () => {
    it('should return an access_token with the user payload', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send(testUser)
        .expect(200)
        .expect((res) => {
          access_token = res.body.access_token;
          user_id = res.body.id;
          expect(res.body).toBeDefined();
          expect(res.body).toHaveProperty('access_token');
          expect(res.body).toHaveProperty('id');
          expect(res.body.email).toEqual(testUser.email.toLowerCase());
          expect(res.body.name).toEqual(testUser.name);
        });
    });

    it('should return a 401 error when provided with the wrong credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: testUser.email, password: 'wrongpassword' })
        .expect(401);
    });

    it("should return a 404 error when the user doesn't exist", () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: faker.internet.email(), password: 'wrongpassword' })
        .expect(404);
    });
  });

  describe('bills', () => {
    const fakeBill = () => ({
      amount: Number(faker.finance.amount({ min: 1, max: 100 })),
      details: faker.finance.transactionDescription(),
      due_date: faker.date.future(),
    });
    const bills = Array.from({ length: 10 }, fakeBill);

    describe('/bills (POST)', () => {
      it('should return a 401 error when not authenticated', () => {
        return request(app.getHttpServer())
          .post('/bills')
          .send(bills)
          .expect(401);
      });

      it('should create new bills', () => {
        return request(app.getHttpServer())
          .post('/bills')
          .set('Authorization', `Bearer ${access_token}`)
          .send(bills)
          .expect(201)
          .expect((res) => {
            expect(res.body).toBeDefined();
            expect(res.body).toHaveProperty('count');
            expect(res.body.count).toEqual(bills.length);
          });
      });
    });

    let bill_id: string;
    describe('/bills (GET)', () => {
      it('should return a 401 error when not authenticated', () => {
        return request(app.getHttpServer()).get('/bills').expect(401);
      });

      it('should return a list of bills for the user', () => {
        return request(app.getHttpServer())
          .get('/bills')
          .set('Authorization', `Bearer ${access_token}`)
          .expect(200)
          .expect((res) => {
            expect(res.body).toBeDefined();
            expect(res.body).toHaveLength(bills.length);
            expect(
              res.body.every((bill) => bill.user_id === user_id),
            ).toBeTruthy();
            bill_id = res.body[0].id;
          });
      });
    });

    describe('/bills/:id (GET)', () => {
      it('should return a 401 error when not authenticated', () => {
        return request(app.getHttpServer())
          .get(`/bills/${bill_id}`)
          .expect(401);
      });

      it('should return the bill with the specified ID', () => {
        return request(app.getHttpServer())
          .get(`/bills/${bill_id}`)
          .set('Authorization', `Bearer ${access_token}`)
          .expect(200)
          .expect((res) => {
            expect(res.body).toBeDefined();
            expect(res.body.id).toEqual(bill_id);
            expect(res.body.user_id).toEqual(user_id);
          });
      });
    });
  });

  describe('invoices', () => {
    const fakeInvoice = () => ({
      amount: Number(faker.finance.amount({ min: 1, max: 100 })),
      details: faker.finance.transactionDescription(),
      due_date: faker.date.future(),
    });
    const invoices = Array.from({ length: 10 }, fakeInvoice);

    describe('/invoices (POST)', () => {
      it('should return a 401 error when not authenticated', () => {
        return request(app.getHttpServer())
          .post('/invoices')
          .send(invoices)
          .expect(401);
      });

      it('should create new invoices', () => {
        return request(app.getHttpServer())
          .post('/invoices')
          .set('Authorization', `Bearer ${access_token}`)
          .send(invoices)
          .expect(201)
          .expect((res) => {
            expect(res.body).toBeDefined();
            expect(res.body).toHaveProperty('count');
            expect(res.body.count).toEqual(invoices.length);
          });
      });
    });

    let invoice_id: string;
    describe('/invoices (GET)', () => {
      it('should return a 401 error when not authenticated', () => {
        return request(app.getHttpServer()).get('/invoices').expect(401);
      });

      it('should return a list of invoices for the user', () => {
        return request(app.getHttpServer())
          .get('/invoices')
          .set('Authorization', `Bearer ${access_token}`)
          .expect(200)
          .expect((res) => {
            expect(res.body).toBeDefined();
            expect(res.body).toHaveLength(invoices.length);
            expect(
              res.body.every((invoice) => invoice.user_id === user_id),
            ).toBeTruthy();
            invoice_id = res.body[0].id;
          });
      });
    });

    describe('/invoices/:id (GET)', () => {
      it('should return a 401 error when not authenticated', () => {
        return request(app.getHttpServer())
          .get(`/invoices/${invoice_id}`)
          .expect(401);
      });

      it('should return the invoice with the specified ID', () => {
        return request(app.getHttpServer())
          .get(`/invoices/${invoice_id}`)
          .set('Authorization', `Bearer ${access_token}`)
          .expect(200)
          .expect((res) => {
            expect(res.body).toBeDefined();
            expect(res.body.id).toEqual(invoice_id);
            expect(res.body.user_id).toEqual(user_id);
          });
      });
    });
  });
});
