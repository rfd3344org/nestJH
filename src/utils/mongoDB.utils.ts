

export const getMongoDBUri = () => {
  const { MONGO_DB_NAME, MONGO_USER, MONGO_PASSWORD } = process.env;

  return `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.giwpq.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
}