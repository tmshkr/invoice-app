require('dotenv').config({ path: '../../.env' });

export const jwtSecret =
  process.env.JWT_SECRET || require('crypto').randomBytes(32).toString('hex');
