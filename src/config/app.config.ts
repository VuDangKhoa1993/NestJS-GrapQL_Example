import 'dotenv/config';

const appConfig = {
  development: {
    USER_APP_ID: process.env.USER_APP_ID,
  },
  test: {
    USER_APP_ID: process.env.USER_APP_ID,
  },
};

export const loadAppConfig = () => ({ ...appConfig[process.env.NODE_ENV] });
