import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { connectMongoDB } from './db/connectMongoDB.js';

import { errors } from 'celebrate';

const app = express();
const PORT = process.env.PORT ?? 3000;

// 🛡 Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(logger);

// 📌 Routes
app.use('/api/notes', notesRoutes);
app.use('/auth', authRoutes);

// обробка favicon, щоб не було 500
app.get('/favicon.ico', (req, res) => res.status(204).end());

// ❗ Middleware для обробки помилок
app.use(notFoundHandler); // 404
app.use(errors());        // celebrate errors
app.use(errorHandler);    // глобальний handler помилок

// 🚀 Start server
const startServer = async () => {
  try {
    await connectMongoDB();
    console.log('✔ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Server start failed:', err.message);
    process.exit(1);
  }
};

startServer();



