
import { MongooseModule } from '@nestjs/mongoose';


const formatMongoURL = () => {
  const { MONGO_DB_NAME, MONGO_USER, MONGO_PASSWORD } = process.env;
  return `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.lph5oow.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
};


export const MongoModule = MongooseModule.forRoot(formatMongoURL());