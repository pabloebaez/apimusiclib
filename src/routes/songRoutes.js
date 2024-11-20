import express from 'express';
import { getSongs, getSongById, createSong, updateSong, deleteSong, getArtistsAndSongs, getSongsByArtist } from '../controllers/songController.js';

const router = express.Router();
router.get('/songs-with-artists', getArtistsAndSongs);
router.get('/artist/:artistId', getSongsByArtist);
router.get('/', getSongs); // Obtener todas las canciones
router.get('/:id', getSongById); // Obtener una canción por ID
router.post('/', createSong); // Crear una nueva canción
router.put('/:id', updateSong); // Actualizar una canción
router.delete('/:id', deleteSong); // Eliminar una canción





export default router;
