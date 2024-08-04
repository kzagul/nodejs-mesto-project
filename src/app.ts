import express from 'express';
import mongoose from 'mongoose';
import {
    userRoutes,
    cardRoutes
} from './routes';
import { errors } from 'celebrate';
import { errorsHandler } from "./errors/hander"
import { authMe } from "./middlewares/auth"

const { 
  PORT = 3000, 
  MONGODB_URL = `mongodb://localhost:27017/mestodb` 
} = process.env;

const app = express();

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(authMe)
  .use('/users', userRoutes)
  .use('/cards', cardRoutes)
  .use(errors())
  .use(errorsHandler)

const bootstrap = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log('База MongoDB подключена');

    await app.listen(+PORT, () => {
      console.log(`Приложение запустилось на порту: ${PORT}`)
    })
  } catch (err) {
    console.log(err);
  }
};

bootstrap()
