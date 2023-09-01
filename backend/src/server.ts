import express from 'express';
import router from './routes';
import { Config } from './config';
import MongoConnection from './database/mongodb.provider';
import cors from 'cors';
import morgan from 'morgan';

import { User } from './models/user.schema';
import { Company } from './models/company.schema';

// validate env config
for (const [key, value] of Object.entries(Config)) {
  if (!value) {
    console.error(`Missing environment variable for "${key}".`);
    process.exit(1);
  }
}

MongoConnection()
.then(db => {

  if (!db) {
    process.exit(1);
  }

  const app = express();
  const port = Config.PORT;

  app.use(morgan('dev'));

  // Allow any method from any host and log requests
  app.use(cors());

  // Handle POST requests that come in formatted as JSON
  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  // use routes defined in routes/index.ts
  app.use('/', router);

  // start our server on specified port default: 24100
  app.listen(port, function() {
      console.log("Server now listening on " + port);
  });
})
.catch(e => {
  console.error(e);
});

