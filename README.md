# TAREA 10 API de Biblioteca de Música con Express y Sequelize

Este proyecto de Backend esta desarrollado en NODE JS, Corre en la siguiente URL:
Open [http://localhost:3000](http://localhost:4000). Puedes usarlo con Postman.

# Rutas para usar en Postman

## SONGS: /api/songs/

- POST /songs: Crear una nueva canción.

- GET /songs: Obtener todas las canciones.

- PUT /songs/:id: Actualizar una canción existente.

- DELETE /songs/:id: Eliminar una canción existente.



## SONGS: /api/artists/   

- POST /artists: Crear un nuevo artista.

- GET /artists: Obtener todos los artistas.

- PUT /artists/:id: Actualizar un artista existente.

- DELETE /artists/:id: Eliminar un artista existente.

- GET /artists/:id/songs: Obtener todas las canciones de un artista

- GET /songs-with-artists: Obtener todas las canciones con sus respectivos artistas

- GET /songs/artist/:artistId: Obtener todas las canciones de un artista específico

- GET /artists-by-song-duration/:duration: Obtener todos los artistas que tienen canciones con una duración específica o mayor, mostrando también la información de las canciones

# Dependencias necesarias para correr el Proyecto:
 "dependencies":
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "pg": "^8.12.0",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.37.3"

---------------------------------------------------


