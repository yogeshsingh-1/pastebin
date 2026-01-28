import { PasteAttributes, PasteCreationAttributes } from "interface/pastes.interface";
import { Sequelize, DataTypes, Model } from "sequelize";

export default (sequelize: Sequelize) => {
  const Paste = sequelize.define<Model<PasteAttributes, PasteCreationAttributes>>(
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
      viewcount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      max_views: {
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
