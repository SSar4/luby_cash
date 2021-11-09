import User from 'App/Models/User'

class FindByEmailService {
  public async execute(cpf: string) {
    const user = await User.findByOrFail('cpf', cpf)
    await user.load('account')
    return user
  }
}

export default new FindByEmailService()
