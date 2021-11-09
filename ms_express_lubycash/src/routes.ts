import express from "express";
import ClientController from "./controllers/ClientController";

const router = express.Router();

router.post("/new/client", ClientController.create);
router.get("/client", ClientController.findAll);

export { router };
