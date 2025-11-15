// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
// import helmet from 'helmet'; // временно отключено — вызывает проблемы на Render

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRoutes from './routes/notesRoutes.js';
import { connectMongoDB } from './db/connectMongoDB.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// app.use(helmet()); // отключено
app.use(cors());
app.use(express.json());
app.use(logger);

// Маршруты — корректный путь
app.use('/notes', notesRoutes);

// Обработчики ошибок
app.use(notFoundHandler);
app.use(errorHandler);

// Запуск сервера ТОЛЬКО после подключения к MongoDB
const startServer = async () => {
  try {
    await connectMongoDB();
    console.log('✔ MongoDB connected');

    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();
