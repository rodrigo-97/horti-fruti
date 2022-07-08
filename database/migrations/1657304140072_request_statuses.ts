import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'request_statuses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('request_id').unsigned().notNullable().references('id').inTable('requests')
      table.integer('status_id').unsigned().notNullable().references('id').inTable('statuses')
      table.string('comments').nullable()
      table.primary(['request_id', 'status_id'])
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
