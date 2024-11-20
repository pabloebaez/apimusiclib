// src/models/index.js
import Song from './song.js';
import Artist from './artist.js';

// Definir relaciones
// Artist.hasMany(Song, { foreignKey: 'artistId' });
// Song.belongsTo(Artist, { foreignKey: 'artistId' });
Song.belongsTo(Artist, { as: 'artist', foreignKey: 'artistId' });
Artist.hasMany(Song, { as: 'songs', foreignKey: 'artistId' });


export { Song, Artist };

// En associations.js

