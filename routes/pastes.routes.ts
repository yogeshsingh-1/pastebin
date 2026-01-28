import express, { NextFunction, Request, Response, Router } from "express";
import db from "../models/index";
import { nanoid } from "nanoid";
import { validate } from "../middlewares/zodValidate";
import { createPasteSchema } from "../validation/pastes.validation";
const router: Router = express.Router();

// Create a new paste
router.post(
  "/pastes",
  validate(createPasteSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { content, title, max_views, ttl_seconds } = req.body;
      const slug = nanoid(6);
      const expiresAt = ttl_seconds ? new Date(Date.now() + ttl_seconds * 1000) : null;
      await db.Paste.create(
        {
          slug,
          content,
          title,
          max_views,
          expiresAt,
        }
      );
      ;
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Content-disposition", "inline");
      const rawIp = req.ip;

      const ip = rawIp?.startsWith("::ffff:")
        ? rawIp.slice(7)
        : rawIp ?? "unknown";

      return res.status(201).json({
        "id": slug,
        ip,
        "url": `https://your-app.vercel.app/p/${slug}`
      });
      // return res.status(201).json({ message: "Paste created", slug });
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

      const paste = await db.Paste.findOne({ where: { slug } });

      if (!paste) {
        return res.status(404).json({
          success: false,
          error: {
            code: "PASTE_NOT_AVAILABLE",
            message: "The requested paste is no longer available",
          },
        });
      }

      //  USE HERE (expiry logic only)
      const now = getNow(req);

      if (paste.expiresAt && paste.expiresAt < now) {
        return res.status(404).json({
          success: false,
          error: {
            code: "PASTE_NOT_AVAILABLE",
            message: "The requested paste is no longer available",
          },
        });
      }

      const remainingViews =
        paste.max_views !== null
          ? paste.max_views - paste.viewcount
          : null;

      if (remainingViews !== null && remainingViews <= 0) {
        return res.status(404).json({
          success: false,
          error: {
            code: "PASTE_NOT_AVAILABLE",
            message: "The requested paste is no longer available",
          },
        });
      }

      paste.viewcount += 1;
      await paste.save();

      return res.status(200).json({
        content: paste.content,
        remaining_views:
          paste.max_views !== null
            ? paste.max_views - paste.viewcount
            : null,
        expires_at: paste.expiresAt ?? null,
      });
    } catch (error) {
      return next(error);
    }
  }
);



export function getNow(req: Request): Date {
  if (
    process.env.TEST_MODE === "1" &&
    req.headers["x-test-now-ms"]
  ) {
    const ms = Number(req.headers["x-test-now-ms"]);
    if (!Number.isNaN(ms)) {
      return new Date(ms);
    }
  }

  return new Date();
}

export default router;
