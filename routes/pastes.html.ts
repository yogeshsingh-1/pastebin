import express, { Request, Response, NextFunction, Router } from "express";
import db from "../models/index";
import { getNow } from "./pastes.routes";
const router: Router = express.Router();

router.get("/:slug", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;

    const paste = await db.Paste.findOne({
      where: { slug },
      attributes: [
        "id",
        "content",
        "max_views",
        "viewcount",
        "expiresAt",
      ],
    });

    if (!paste) {
      return res.status(404).render("404");
    }

    const now = getNow(req);

    if (paste.expiresAt && paste.expiresAt < now) {
      return res.status(404).render("404");
    }

    if (
      paste.max_views !== null &&
      paste.viewcount >= paste.max_views
    ) {
      return res.status(404).render("404");
    }

    paste.viewcount += 1;
    await paste.save();

    return res.status(200).render("index", {
      content: paste.content,
    });
  } catch (e) {
    return next(e);
  }
});


export default router;