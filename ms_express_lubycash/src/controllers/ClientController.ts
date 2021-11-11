import { Request, Response } from "express";
import { ClientModel } from "../database/models/Client";
import { validationResult } from "express-validator";
import CheckClientsController from "../services/client/VerifyClientService";
class ClientController {
  async findAll(req: Request, res: Response) {}

  create(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
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
      } = req.body;
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
