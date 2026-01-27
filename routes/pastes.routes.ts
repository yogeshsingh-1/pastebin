import express, { NextFunction, Request, Response, Router } from "express";
import db from "../models/index";
import { nanoid } from "nanoid";
import { Transaction } from "sequelize";
import { validate } from "../middlewares/zodValidate";
import { createPasteSchema } from "../validation/pastes.validation";
import { tr } from "zod/v4/locales";
const router: Router = express.Router();

// Create a new paste
router.post(
  "/pastes",
  validate(createPasteSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { content, title, maxViews, expiresAt } = req.body;
      const slug = nanoid(6);
      await db.sequelize.transaction(async (transaction: Transaction) => {
        await db.Paste.create(
          {
            slug,
            content,
            title,
            maxViews,
            expiresAt,
          },
          transaction
        );
        await transaction.commit();
      });
      return res.status(201).json({ message: "Paste created", slug });
    } catch (error) {
      return next(error);
    }
  }
);
// Get a paste by slug

router.get(
  "/pastes/:slug",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slug } = req.params;
      const paste = await db.Paste.findOne({
        where: { slug },
        attributes: ["content", ["viewCount", "remaining_views"], "expiresAt"],
      });
      if (!paste) {
        return res.status(404).json({ error: "Paste not found" });
      }
      // Increment view count
      //   paste.viewCount += 1;
      //   await paste.save();
      return res.json(paste);
    } catch (error) {
      return next(error);
    }
  }
);
export default router;
