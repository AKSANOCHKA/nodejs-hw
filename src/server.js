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

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger);

// маршрути
app.use(notesRoutes);

// ❗ 404 обробник МАЄ йти перед errors()
app.use(notFoundHandler);

// celebrate errors — після 404
app.use(errors());

// глобальний обробник помилок
app.use(errorHandler);

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



