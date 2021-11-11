import express from "express";
import ClientController from "./controllers/ClientController";
import ValidatorClients from "./validators/Clients";

const router = express.Router();

router.post("/new/client", ValidatorClients, ClientController.create);
router.get("/client", ClientController.findAll);

export { router };
