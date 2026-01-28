import { Optional } from "sequelize";

export interface PasteAttributes {
  id: number;
  slug: string;
  content: string;
  viewcount: number;
  max_views?: number;
  expiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface PasteCreationAttributes
  extends Optional<PasteAttributes, "id" | "viewcount"> {}