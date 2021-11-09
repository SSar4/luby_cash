import express, { json } from "express";
import * as dotenv from "dotenv";

import { router } from "./routes";
import { db } from "./database/db";
dotenv.config();

const app = express();

app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(process.env.PORT || 3000, async () => {
  db.sync();
  console.log("app running " + process.env.OI);
});
