import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserService from 'App/Services/Users/CreateUserService'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import PaginateUserService from 'App/Services/Users/PaginateUserService'
import DeleteUserService from 'App/Services/Users/DeleteUserService'
import UpdateUserService from 'App/Services/Users/UpdateUserService'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
    const user = await CreateUserService.execute(await request.validate(CreateUserValidator))

    return response.status(201).send(user)
  }

  public async index({ response, params }: HttpContextContract) {
    const users = await PaginateUserService.execute(params.page, params.limit)

    return response.status(200).send(users)
  }

  public async delete({ auth, response }: HttpContextContract) {
    await DeleteUserService.execute(auth.user)

    return response.status(200).send('Conta deletada.')
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const data = await request.validate(UpdateUserValidator)

    const user = await UpdateUserService.execute(data, auth.user)

    return response.status(200).send(user)
  }
}
