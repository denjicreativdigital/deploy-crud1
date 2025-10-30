import { Sequelize } from "sequelize";
import db from "../config/database.js"; // pastikan pakai .js ya, Paduka

const { DataTypes } = Sequelize;

const Produk = db.define('produk', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true
});

export default Produk;
