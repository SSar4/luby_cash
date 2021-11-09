import { Request, Response } from "express";
import { ClientModel } from "../database/models/Client";
import Clients from "../models/Client";
import CheckClientsController from "../services/client/VerifyClientService";
class ClientController {
  async findAll(req: Request, res: Response) {}

  create(req: Request, res: Response) {
    try {
      const {
        fullName,
        email,
        phone,
        cpfNumber,
        address,
        city,
        state,
        zipcode,
        status,
        averageSalary,
        currentBalance,
      }: Clients = req.body;
      const client = {
        fullName,
        email,
        phone,
        cpfNumber,
        address,
        city,
        state,
        zipcode,
        status,
        averageSalary,
        currentBalance,
      };
      ClientModel.findOrCreate({
        where: { cpfNumber: cpfNumber },
        defaults: client,
      })
        .then((data) => {
          CheckClientsController.verifycpf(cpfNumber);
          return res.json({
            message: "aguarde ao email com o resultado da solicitacão",
          });
        })
        .catch((err) => res.status(400).send(err));
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

export default new ClientController();
