import Song from '../models/song.js';
import Artist from '../models/artist.js';  // Asegúrate de importar el modelo Artist

// Obtener todas las canciones
export const getSongs = async (req, res, next) => {
  try {
    const songs = await Song.findAll();
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

// Obtener una canción por ID
export const getSongById = async (req, res, next) => {
  try {
    const song = await Song.findByPk(req.params.id, {
      include: {
        model: Artist,
        as: 'artist',  // Usa el alias aquí
        attributes: ['name'] // Incluye solo el nombre del artista
      }
    });
    if (song) {
      res.status(200).json(song);
    } else {
      res.status(404).json({ message: 'Canción no encontrada' });
    }
  } catch (error) {
    next(error);
  }
};


// Crear una nueva canción
export const createSong = async (req, res, next) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (error) {
    next(error);
  }
};

// Actualizar una canción
export const updateSong = async (req, res, next) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (song) {
      await song.update(req.body);
      res.status(200).json(song);
    } else {
      res.status(404).json({ message: 'Canción no encontrada' });
    }
  } catch (error) {
    next(error);
  }
};

// Eliminar una canción
export const deleteSong = async (req, res, next) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (song) {
      await song.destroy();
      res.status(200).json({ message: 'Canción eliminada' });
    } else {
      res.status(404).json({ message: 'Canción no encontrada' });
    }
  } catch (error) {
    next(error);
  }
};



// Traer canciones con sus respectivos artistas
export const getArtistsAndSongs = async (req, res, next) => {
  try {
    // Consultar todas las canciones incluyendo solo el nombre del artista
    const songs = await Song.findAll({
      attributes: ['title'],  // Solo incluir el título de la canción
      include: {
        model: Artist,
        attributes: ['name']  // Solo incluir el nombre del artista
      }
    });

    // Mapear el resultado para incluir solo el título de la canción y el nombre del artista
    const result = songs.map(song => ({
      title: song.title,
      artist: song.Artist.name
    }));

    // Devolver los resultados combinados
    res.status(200).json(result);
  } catch (error) {
    console.error("Error al obtener canciones y artistas:", error);
    next(error);  // Usar next para pasar el error al middleware de manejo de errores
  }
};

//-----------------------
// Obtener todas las canciones de un artista específico
export const getSongsByArtist = async (req, res, next) => {
  const { artistId } = req.params;

  if (isNaN(artistId)) {
    return res.status(400).json({ message: 'ID del artista no válido' });
  }

  try {
    const songs = await Song.findAll({
      where: {
        artistId: artistId  // Filtrar canciones por el ID del artista
      },
      attributes: ['title']  // Solo incluir el título de la canción
    });

    if (songs.length > 0) {
      res.status(200).json(songs);
    } else {
      res.status(404).json({ message: 'No se encontraron canciones para este artista' });
    }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    next(error);  // Usar next para pasar el error al middleware de manejo de errores
  }
};


