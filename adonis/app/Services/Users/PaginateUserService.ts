import MsConnectionUm from 'App/Services/Database/MsConnectionUm'

class PaginateUserService {
  public async execute(page: number, limit: number) {
    return MsConnectionUm.execute().query().from('clients').paginate(page, limit)
  }
}

export default new PaginateUserService()
