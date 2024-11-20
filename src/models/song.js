import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';  // Ajusta la ruta según tu estructura

const Song = sequelize.define('Song', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artistId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  releaseYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  coverUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'Songs', // Nombre de la tabla en la base de datos
  timestamps: false   // Si no estás usando createdAt/updatedAt
});

export default Song;
