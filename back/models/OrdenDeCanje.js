const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db-config");

const OrdenDeCanje = sequelize.define(
  "ordenDeCanje",
  {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "usuario",
        key: "id",
      },
    },
    productInfo: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    emisionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "ordenDeCanje",
    timestamps: false,
  }
);

module.exports = OrdenDeCanje;
