import User from 'App/Models/User'
import { DateTime } from 'luxon'
import Database from '@ioc:Adonis/Lucid/Database'

class FindTransactions {
  public async execute(userId: string, month: string, year: string) {
    const date = DateTime.fromFormat(`01/${month}/${year}`, 'dd/MM/yyyy')

    const user = await User.findOrFail(userId)
    await user.load('account')

    const outbound = await Database.query()
      .sum('value as total')
      .count('id')
      .from('transactions')
      .where('created_at', '>', date.toSQL())
      .andWhere('source_account_id', '=', user.account.id)

    const inbound = await Database.query()
      .sum('value as total')
      .count('id')
      .from('transactions')
      .where('created_at', '>', date.toSQL())
      .andWhere('destination_account_id', '=', user.account.id)

    return { outbound, inbound }
  }
}

export default new FindTransactions()
