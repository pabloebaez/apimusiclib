import express from 'express';
import dotenv from 'dotenv';
import artistRoutes from './src/routes/artistRoutes.js';
import songRoutes from './src/routes/songRoutes.js';
import versionRoutes from './src/routes/version.js';
// import { errorHandler } from './src/middlewares/errorHandler.js';
import sequelize from './src/config/database.js';
import './src/models/associations.js';
import Song from './src/models/song.js';
import Artist from './src/models/artist.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const apiName = process.env.NAME;

app.use(express.json());
app.use(cors()); // Habilita CORS para todas las rutas
app.use('/api/artists', artistRoutes); // Ruta para manejar artistas
app.use('/api/songs', songRoutes); // Ruta para manejar canciones
app.use('/api/version', versionRoutes);
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// app.use(errorHandler);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`API ${apiName} corriendo en puerto ${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});