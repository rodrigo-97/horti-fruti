import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'requests'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.uuid('uid').unique().notNullable()
      table.integer('client_id').unsigned().notNullable().references('id').inTable('clients')
      table.integer('store_id').unsigned().notNullable().references('id').inTable('stores')
      table.integer('address_id').unsigned().notNullable().references('id').inTable('addresses')
      table
        .integer('payment_method_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('payment_methods')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
