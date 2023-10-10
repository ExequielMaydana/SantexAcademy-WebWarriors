const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db-config");

const Usuario = sequelize.define(
  "usuario",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      unique: {
        name: "phone_UNIQUE",
        msg: "El número de teléfono ya está en uso.",
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: "email_UNIQUE",
        msg: "El email ya está en uso.",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.JSON,
    },
    reputation: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    hoursAcc: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    rolesId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "usuario",
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }, { name: "rolesId" }],
      },
      {
        name: "email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [{ name: "email" }],
      },
      {
        name: "fk_usuario_roles1_idx",
        using: "BTREE",
        fields: [{ name: "rolesId" }],
      },
      {
        name: "idx_usuario_testimonio",
        using: "BTREE",
        fields: [{ name: "id" }, { name: "createdAt" }],
      },
    ],
  }
);

module.exports = Usuario;
