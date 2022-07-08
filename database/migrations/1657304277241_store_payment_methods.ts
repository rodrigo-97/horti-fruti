import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'store_payment_methods'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('store_id').unsigned().notNullable().references('id').inTable('stores')
      table
        .integer('payment_method_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('payment_methods')
      table.primary(['store_id', 'payment_method_id'])
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
