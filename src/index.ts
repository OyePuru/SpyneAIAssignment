import express from 'express';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './db/connection';
import indexRouter from './router';

dotenv.config();

const app = express();

// middlewares
app.use(express.json())
app.use(cookieParser())

app.use('/', indexRouter)

app.listen(Number(process.env.PORT), async () => {
  await connectDB();
  console.log("Server is up and running")
});