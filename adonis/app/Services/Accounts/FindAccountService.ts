import { DateTime } from 'luxon'
import User from 'App/Models/User'

class FindAccountService {
  public async execute(user: User | undefined) {
    if (!user) throw new Error('Usuário não existe')

    const oneMonth = DateTime.now().minus({ months: 1 })

    await user.load('account')

    await user.account.load('entrada', (tQuery) => {
      tQuery.where('created_at', '>', oneMonth.toSQL())
    })
    await user.account.load('saida', (tQuery) => {
      tQuery.where('created_at', '>', oneMonth.toSQL())
    })
  }
}

export default new FindAccountService()
