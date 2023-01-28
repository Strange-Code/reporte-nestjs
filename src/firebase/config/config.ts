import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    firebase: {
      apiKey: process.env.GOOGLE_FIREBASE_API_KEY,
      privateKey: process.env.GOOGLE_FIREBASE_PRIVATE_KEY,
      secretOrKey: process.env.GOOGLE_FIREBASE_SECRET_OR_KEY,
    },
  };
});
