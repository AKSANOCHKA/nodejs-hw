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
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger);

app.use(notesRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

// ❗ ВАЖНО: запускаем сервер ТОЛЬКО после успешного подключения к MongoDB
connectMongoDB()
  .then(() => {
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
