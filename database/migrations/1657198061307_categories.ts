import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('description').nullable()
      table.string('position').notNullable()
      table.boolean('active').notNullable().defaultTo(true)
      table
        .integer('store_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('stores')
        .onDelete('restrict')
      table.timestamp('deleted_at', { useTz: true }).nullable().defaultTo(null)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
