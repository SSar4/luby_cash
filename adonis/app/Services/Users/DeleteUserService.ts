import User from 'App/Models/User'

class DeleteUserService {
  public async execute(user: User | undefined) {
    await user?.delete()
  }
}

export default new DeleteUserService()
