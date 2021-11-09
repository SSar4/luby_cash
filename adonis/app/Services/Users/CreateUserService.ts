import User from 'App/Models/User'

interface CreateUser {
  email: string
  cpf: string
  password: string
}

class CreateUserService {
  public async execute({ password, email, cpf }: CreateUser) {
    const user = await User.create({ email, password, cpf })

    await user.related('role').create({ user_type: 'administrator' })

    await user.load('role')

    return user
  }
}

export default new CreateUserService()
