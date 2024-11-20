import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';  // Ajusta la ruta según tu estructura

const Artist = sequelize.define('Artist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'Artists', // Nombre de la tabla en la base de datos
  timestamps: false   // Si no estás usando createdAt/updatedAt
});

export default Artist;
