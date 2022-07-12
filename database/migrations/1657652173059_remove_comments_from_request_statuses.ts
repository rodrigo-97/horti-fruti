import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'request_statuses'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('comments')
    })
  }
}
