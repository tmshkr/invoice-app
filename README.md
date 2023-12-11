# Invoice App

## Getting Started

Prisma requires a MongoDB database configured as a replica set.

You can use the provided [docker-compose file](docker-compose.yml) to start the app with MongoDB configured as a replica set:

```
docker compose up
```

The app will be available at http://localhost:8000

Once you register and login, you can create seed invoices and bills by clicking `Create Invoices` and `Create Bills` on their respective pages.

## Running the tests

To run the tests in the Docker container:

```
docker exec -it app sh test.sh
```

Note: Playwright will download a Chromium browser, which will take some time.
