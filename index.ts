import express, { Application } from "express";
import dotenv from "dotenv";
import "./app";
// import { z } from "zod";
import pastesroutes from "./routes/pastes.routes";
import errorHandler from "./middlewares/errorHandler";
dotenv.config({ quiet: true });
const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", pastesroutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
