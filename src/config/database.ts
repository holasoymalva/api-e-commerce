import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const initializeDatabase = async () => {
  try {
    const connection = await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['src/models/*.ts'],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
    });
    console.log('Database connected successfully');
    return connection;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
};
