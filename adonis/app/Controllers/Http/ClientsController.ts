import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'

export default class ClientsController {
  public async index({ request, response }: HttpContextContract) {
    const date = DateTime.fromFormat(
      `01/${request.param('month')}/${request.param('year')}`,
      'dd/MM/yyyy'
    )

    const clients = await Database.connection('pg_ms')
      .from('clients')
      .where('status', '=', request.param('status'))
      .andWhere('createdAt', '>', date.toSQL())

    return response.status(200).send(clients)
  }
}
