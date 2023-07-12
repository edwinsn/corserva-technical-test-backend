### Corserva TEST

## Instructions


# Start

To start the container (api and db ) run:

`sudo npm run start-container`

If you aren't in linux but windows you can estart-containerxecute `npm run start-container` with the necesary permissions.

This will start the api at port 4000 [localhost:4000](http://localhost:4000). Use an user with privilegis according to you permissions `sudo npm start-container`

# Run test

You can run the test by running: 

`npm run test`

# Run in Dev mode

You can run the project in dev mode by running

`npm run dev`

Also you will need the DB so you well need `start-container`. But before this dont forget to comment out the following lines in the `docker-compose.yml` file 

`  api:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 4000:4000` 