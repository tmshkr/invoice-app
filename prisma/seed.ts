import { PrismaClient, User } from "@prisma/client";
import { faker } from "@faker-js/faker";
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

seed();

async function seed() {
  const user = await createUser();
  const { count } = await createInvoices(user);
  console.log(`Created ${count} invoices for user ${user.email}`);
}

async function createUser() {
  const email = faker.internet.email();
  const password = faker.internet.password();
  const name = faker.person.fullName();
  const saltRounds = 10;
  const hash: string = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err: any, hash: string) {
      if (err) reject(err);
      resolve(hash);
    });
  });

  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      password_hash: hash,
      name,
    },
  });

  console.log(`Created user`, user);
  console.log(`Be sure to save the password: ${password}`);
  return user;
}

async function createInvoices(user: User) {
  const fakeInvoice = () => ({
    amount: Number(faker.finance.amount({ min: 1, max: 100 })),
    details: faker.finance.transactionDescription(),
    due_date: faker.date.future(),
    user_id: user.id,
  });
  const invoices = Array.from({ length: 10 }, fakeInvoice);
  return await prisma.invoice.createMany({ data: invoices });
}
