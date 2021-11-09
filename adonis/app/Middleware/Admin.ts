import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Exception } from '@poppinss/utils'

export default class IsAdmin {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    await auth.user!.load('role')

    if (auth.user!.role.user_type !== 'administrator') {
      throw new Exception('Não é admin do sistema sorry.', 403)
    }

    await next()
  }
}