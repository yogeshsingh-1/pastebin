import { Optional } from "sequelize";

export interface PasteAttributes {
  id: number;
  content: string;
  viewCount: number;
  maxViews?: number;
  expiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface PasteCreationAttributes
  extends Optional<PasteAttributes, "id" | "viewCount"> {}
