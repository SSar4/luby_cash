import User from 'App/Models/User'

interface Response {
  dataValues: { status: string; email: string; cpfNumber: string }
  pass: string
  status: string
  cpf: string
}

class HandleApprovedService {
  public async execute({ dataValues, pass }: Response) {
    console.log(
      '------------------------' + dataValues.status + '---------------------------------------'
    )
    if (dataValues.status === 'approved') {
      const user = await User.create({
        email: dataValues.email,
        password: pass,
        cpf: dataValues.cpfNumber,
      })
      await user.related('account').create({ current_balance: 200 })
      await user.related('role').create({ user_type: 'client' })
    }
  }
}

export default new HandleApprovedService()
