import { Op } from 'sequelize';
import Artist from '../models/artist.js';
import Song from '../models/song.js';

export const getArtists = async (req, res, next) => {
  try {
    const artists = await Artist.findAll();
    res.status(200).json(artists);
  } catch (error) {
    next(error);
  }
};

export const getArtistById = async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (artist) {
      res.status(200).json(artist);
    } else {
      res.status(404).json({ message: 'Artista no encontrado' });
    }
  } catch (error) {
    next(error);
  }
};

export const createArtist = async (req, res, next) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json(artist);
  } catch (error) {
    next(error);
  }
};

export const updateArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (artist) {
      await artist.update(req.body);
      res.status(200).json(artist);
    } else {
      res.status(404).json({ message: 'Artista no encontrado' });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (artist) {
      await artist.destroy();
      res.status(200).json({ message: 'Artista eliminado' });
    } else {
      res.status(404).json({ message: 'Artista no encontrado' });
    }
  } catch (error) {
    next(error);
  }
};
// -------------------------------
// Traer canciones por artista
export const getSongsByArtistId = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Encuentra al artista por su ID
    const artist = await Artist.findByPk(id, {
      include: {
        model: Song,
        attributes: ['title', 'releaseYear', 'duration', 'coverUrl']  // Ajusta los atributos según lo que necesites
      }
    });

    if (artist) {
      // Devolver el artista junto con las canciones
      res.status(200).json(artist.Songs);
    } else {
      res.status(404).json({ message: 'Artista no encontrado' });
    }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    next(error);
  }
};

//----------------------------------
export const getArtistsBySongDuration = async (req, res, next) => {
  const { duration } = req.params;

  if (isNaN(duration)) {
    return res.status(400).json({ message: 'Duración no válida' });
  }

  try {
    const artists = await Artist.findAll({
      include: [{
        model: Song,
        attributes: ['title', 'duration'],  // Incluir el título y la duración de las canciones
        where: {
          duration: {
            [Op.gte]: duration  // Filtrar canciones con duración específica o mayor
          }
        }
      }],
      attributes: ['id', 'name']  // Incluir solo los atributos necesarios de los artistas
    });

    if (artists.length > 0) {
      res.status(200).json(artists);
    } else {
      res.status(404).json({ message: 'No se encontraron artistas con canciones de la duración especificada' });
    }
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    next(error);  // Usar next para pasar el error al middleware de manejo de errores
  }
};

// export const getArtistByName = async (req, res, next) => {
//   try {
//     const artist = await Artist.findOne({ where: { name: req.params.name } });
//     if (artist) {
//       res.status(200).json(artist);
//     } else {
//       res.status(404).json({ message: 'Artist not found' });
//     }
//   } catch (error) {
//     console.error('Error fetching artist by name:', error);
//     next(error);
//   }
// };

export const getArtistByName = async (req, res, next) => {
  console.log('Buscando artista:', req.params.name); // Agrega este log
  try {
    const artistName = req.params.name;
    const artist = await Artist.findOne({ 
      where: { 
        name: { 
          [Op.iLike]: artistName 
        } 
      } 
    });

    if (artist) {
      res.status(200).json(artist);
    } else {
      res.status(404).json({ message: 'Artist not found' });
    }
  } catch (error) {
    console.error('Error fetching artist by name:', error);
    next(error);
  }
};
