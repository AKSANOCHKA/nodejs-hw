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
import userRoutes from './routes/userRoutes.js';

import { connectMongoDB } from './db/connectMongoDB.js';
import { errors } from 'celebrate';

const app = express();
const PORT = process.env.PORT ?? 3030;

// 🛡 Global middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(logger);

// 📌 Routes (❗ без префіксів)
app.use(authRoutes);
app.use(notesRoutes);
app.use(userRoutes);

// 🧩 Favicon fix
app.get('/favicon.ico', (req, res) => res.status(204).end());

// ❗ Error handlers
app.use(notFoundHandler); // 404
app.use(errors());        // celebrate errors
app.use(errorHandler);    // global error handler

// 🚀 Start server
const startServer = async () => {
  try {
    await connectMongoDB();
    console.log('✔ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Server start failed:', err.message);
    process.exit(1);
  }
};

startServer();




