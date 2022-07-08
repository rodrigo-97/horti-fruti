import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'add_deleted_at_to_addresses'

  public async up() {
    this.schema.alterTable('addresses', (table) => {
      table.timestamp('deleted_at', { useTz: true }).nullable().defaultTo(null)
    })
  }

  public async down() {
    this.schema.alterTable('addresses', (table) => {
      table.dropColumn('deleted_at')
    })
  }
}
