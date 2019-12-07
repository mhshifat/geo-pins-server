/* eslint-disable no-console */
export const logDbConnectionMsg = () =>
  console.log("[ GEO_PIN ] Database connection has been established!");

export const logServerInitMsg = (port, path) => () =>
  console.log(
    `[ GEO_PIN ] Server is running on http://localhost:${port}${path}!`
  );

export const logErrMsg = err => console.error(err);
