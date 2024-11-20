import express from 'express';
import { getArtists, getArtistById, createArtist, updateArtist, deleteArtist, getArtistsBySongDuration, getSongsByArtistId, getArtistByName } from '../controllers/artistController.js';

const router = express.Router();


router.get('/', getArtists);
router.get('/:id', getArtistById);
router.post('/', createArtist);
router.put('/:id', updateArtist);
router.delete('/:id', deleteArtist);

router.get('/artists-by-song-duration/:duration', getArtistsBySongDuration);
router.get('/:id/songs', getSongsByArtistId); // Traer canciones por artista
router.get('/by-name/:name', getArtistByName);


export default router;
