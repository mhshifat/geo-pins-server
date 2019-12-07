import { OAuth2Client } from "google-auth-library";
import config from "../config";
import models from "../models";

const { google } = config;
const client = new OAuth2Client(google.clientId);

export const findOrCreateUser = async token => {
  const userInfo = await verifyAuthToken(token);
  const user = await checkIfUserExists(userInfo.email);
  return user ? user : await createNewUser(userInfo);
};

const verifyAuthToken = async token => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: google.clientId
    });
    return ticket.getPayload();
  } catch (err) {
    console.error("Error verifying auth token!", err);
  }
};

const checkIfUserExists = async email =>
  await models.User.findOne({ email }).exec();

const createNewUser = userInfo => {
  const { name, email, picture } = userInfo;
  const newUser = { name, email, picture };
  return models.User.create(newUser);
};
