import Account from 'App/Models/Account'
import Transaction from 'App/Models/Transaction'
import Database from '@ioc:Adonis/Lucid/Database'
import { Exception } from '@poppinss/utils'

class CreateTransactionService {
  public async execute(value: number, source_account: Account, destination_account: Account) {
    if (source_account.id === destination_account.id)
      throw new Exception('Você não pode enviar um PIX para si mesmo')

    if (source_account.current_balance - value < 0) throw new Exception('Você não tem saldo')
    const trx = await Database.transaction()
    source_account.current_balance -= value
    destination_account.current_balance += value

    source_account.$trx
    destination_account.$trx

    const res = await Transaction.create({
      value: value,
      source_account_id: source_account.id,
      destination_account_id: destination_account.id,
    })
    await source_account.save()
    await destination_account.save()
    await trx.commit()
    return res
  }
}

export default new CreateTransactionService()
