import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const user = new User()

    user.email = 'admin@gmail.com'
    user.password = '369SAr'
    user.cpf = '00000000000'

    await user.save()

    await user.related('role').create({ user_type: 'administrator' })
  }
}
