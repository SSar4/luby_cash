import { DateTime } from 'luxon'
import { column, BaseModel, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public value: number

  @column()
  public source_account_id: string

  @column()
  public destination_account_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @beforeCreate()
  public static async generateUuid(transaction: Transaction) {
    transaction.id = uuidv4()
  }
}
