const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db-config");

const Organizacion = sequelize.define(
  "organizacion",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        name: "nombre_UNIQUE",
        msg: "Ya existe una organización con ese nombre.",
      },
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: "email_UNIQUE",
        msg: "El email ya está en uso.",
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: {
        name: "telefono_UNIQUE",
        msg: "El número de teléfono ya está en uso.",
      },
    },
    cuit: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: {
        name: "cuit_UNIQUE",
        msg: "El número de CUIT ya está en uso.",
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.JSON,
    },
    coverPage: {
      type: DataTypes.JSON,
    },
    urlWebSite: {
      type: DataTypes.STRING,
    },

    category: {
      type: DataTypes.ENUM({
        values: [
          "Medioambiente y fauna",
          "Asistencia social",
          "Salud y discapacidad",
        ],
      }),
      allowNull: false,
    },

    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    paranoid: true,
    tableName: "organizacion",
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
      {
        name: "cuit_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [{ name: "cuit" }],
      },
    ],
  }
);

module.exports = Organizacion;
