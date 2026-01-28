import express, { Application } from "express";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
import path from "path";
import cors from "cors"

import pastesroutes from "./routes/pastes.routes";
import pastesHtml from "./routes/pastes.html"
import errorHandler from "./middlewares/errorHandler";
import "./app";
const app: Application = express();
const PORT = process.env.PORT || 3000;


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: true }))

app.use("/api", pastesroutes);
app.use("/p", pastesHtml);
app.get("/", (req, res) => {
  return res.send("request is completed in pastedbin");
})
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
