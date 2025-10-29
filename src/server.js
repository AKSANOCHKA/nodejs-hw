// TODO: Express server logic
import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// ---------- Middleware ----------
app.use(cors());               // дозволяє запити з інших доменів
app.use(express.json());        // дозволяє обробляти JSON у body
app.use(pinoHttp());            // логування запитів

// ---------- Маршрути ----------

// GET /notes — всі нотатки
app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});

// GET /notes/:noteId — нотатка за ID
app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
});

// GET /test-error — тестовий маршрут з помилкою
app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

// ---------- Middleware для 404 ----------
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ---------- Middleware для 500 ----------
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: err.message });
});

// ---------- Запуск сервера ----------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

