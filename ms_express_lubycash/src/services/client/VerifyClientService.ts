import { ClientModel } from "../../database/models/Client";
import Kafka from "../kaka/kafka";
import RandomPass from "../generatePass/randomPass";
class VerifyCPFService {
  async verifycpf(cpf: any) {
    const resp = await ClientModel.findOne({
      where: { cpfNumber: cpf },
    });
    if (
      resp.getDataValue("averageSalary") > 500 &&
      resp.getDataValue("status") === "pending"
    ) {
      resp.setDataValue("status", "approved");
      resp.save();
      const kafka = new Kafka({ groupId: "sendClientApproved" });
      const kafka2 = new Kafka({ groupId: "adonisClientApproved" });
      const pass = new RandomPass().randon();
      console.log(pass, "--------------------------------------");
      kafka2.send({
        topic: "client_approved_adonis",
        value: JSON.stringify({ ...resp, pass }),
      });
      kafka.send({
        topic: "client_approved",
        value: JSON.stringify({ ...resp, pass }),
      });
      /**
       * console.log(
        resp.getDataValue("currentBalance"),
        resp.getDataValue("status"),
        "-------------------------------"
      );
       */
    } else if (
      resp.getDataValue("averageSalary") < 500 &&
      resp.getDataValue("status") === "pending"
    ) {
      resp.setDataValue("status", "disapproved");
      const kafka = new Kafka({ groupId: "sendClientDesapproved" });
      resp.save();
      kafka.send({
        topic: "client_desapproved",
        value: JSON.stringify({ ...resp }),
      });
    }
  }
}

export default new VerifyCPFService();
