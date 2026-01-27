import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  const Paste = sequelize.define(
    "Paste",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      slug: { type: DataTypes.STRING(10), allowNull: false, unique: true },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      viewCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      maxViews: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "pastes",
      timestamps: true,
    }
  );

  return Paste;
};
