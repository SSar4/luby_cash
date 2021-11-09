import Database from '@ioc:Adonis/Lucid/Database'

class GetMsConnection {
  public execute() {
    return Database.connection('pg_ms')
  }
}

export default new GetMsConnection()
