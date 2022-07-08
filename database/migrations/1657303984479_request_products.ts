import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'request_products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('product_id').unsigned().notNullable().references('id').inTable('products')
      table.integer('request_id').unsigned().notNullable().references('id').inTable('requests')
      table.decimal('value', 10, 2).notNullable()
      table.decimal('qtd', 10, 3).notNullable()
      table.string('comments').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
