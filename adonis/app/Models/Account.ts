import { DateTime } from 'luxon'
import { column, BaseModel, beforeCreate, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import Transaction from 'App/Models/Transaction'

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public current_balance: number

  @column()
  public user_id: string

  @hasMany(() => Transaction, { foreignKey: 'source_account_id' })
  public saida: HasMany<typeof Transaction>

  @hasMany(() => Transaction, { foreignKey: 'destination_account_id' })
  public entrada: HasMany<typeof Transaction>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid(account: Account) {
    account.id = uuidv4()
  }
}
