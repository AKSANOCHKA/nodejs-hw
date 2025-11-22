// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRoutes from './routes/notesRoutes.js';
import { connectMongoDB } from './db/connectMongoDB.js';

import { errors } from 'celebrate';

const app = express();
const PORT = process.env.PORT ?? 3000;

// ===== Global Middlewares =====
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger);

// ===== Routes (БЕЗ префіксу '/notes') =====
app.use(notesRoutes);

// ===== Celebrate Validation Errors =====
app.use(errors());

// ===== 404 Handler =====
app.use(notFoundHandler);

// ===== Global Error Handler =====
app.use(errorHandler);

// ===== Server Start =====
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


