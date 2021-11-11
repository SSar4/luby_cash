import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AccountsController {
  public async index({ auth, response }: HttpContextContract) {
    console.log(auth.user!.account)

    return response.status(201).send(auth.user!.account)
  }
}
