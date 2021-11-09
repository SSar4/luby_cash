import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
    password: schema.string({}, [rules.confirmed(), rules.regex(/^[a-zA-Z0-9]+$/)]),
    cpf: schema.string({}, [rules.minLength(11), rules.maxLength(11)]),
  })

  public messages = {}
}
