import { JwtSignOptions } from '@nestjs/jwt';

export const jwtConfig = () => ({
  refreshJwtSignOptions: {
    secret: process.env.REFRESH_SECRET_KEY,
    algorithm: process.env.REFRESH_ALGORITHM as JwtSignOptions['algorithm'],
    expiresIn: process.env.REFRESH_EXPIRES_IN,
  } as JwtSignOptions,
  accessJwtSignOptions: {
    secret: process.env.ACCESS_SECRET_KEY,
    algorithm: process.env.ACCESS_ALGORITHM as JwtSignOptions['algorithm'],
    expiresIn: process.env.ACCESS_EXPIRES_IN,
  } as JwtSignOptions,
});
