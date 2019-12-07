const { PORT, MONGODB_URI, GOOGLE_OAUTH_CLIENT_ID } = process.env;

export default {
  root: {
    port: PORT || 5000
  },
  db: {
    uri: MONGODB_URI,
    config: {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: false,
      useFindAndModify: false
    }
  },
  google: {
    clientId: GOOGLE_OAUTH_CLIENT_ID
  }
};
