import { DateTime } from 'luxon'
import { column, beforeSave, BaseModel, hasOne, HasOne, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import { v4 as uuidv4 } from 'uuid'
import Role from 'App/Models/Role'
import Account from 'App/Models/Account'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public cpf: string

  @column()
  public rememberMeToken: string | null

  @hasOne(() => Account, { foreignKey: 'user_id' })
  public account: HasOne<typeof Account>

  @hasOne(() => Role, { foreignKey: 'user_id' })
  public role: HasOne<typeof Role>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static async generateUuid(user: User) {
    user.id = uuidv4()
  }
}
