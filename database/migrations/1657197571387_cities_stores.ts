import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cities_stores'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('city_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('cities')
        .onDelete('cascade')
      table
        .integer('store_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('stores')
        .onDelete('cascade')
      table.decimal('delivery_fee', 8, 2).notNullable()
      table.primary(['city_id', 'store_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
