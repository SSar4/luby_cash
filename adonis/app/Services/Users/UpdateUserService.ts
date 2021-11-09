import User from 'App/Models/User'
import { Exception } from '@poppinss/utils'

interface UpdateUser {
  name?: string
  surname?: string
  email?: string
}

class UpdateUserService {
  public async execute(data: UpdateUser, user: User | undefined) {
    if (!user) throw new Exception('Server error', 500)

    await user.merge(data).save()

    return user
  }
}

export default new UpdateUserService()
