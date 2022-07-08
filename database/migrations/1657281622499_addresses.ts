import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('client_id').notNullable().unsigned().references('id').inTable('clients')
      table.integer('city_id').notNullable().unsigned().references('id').inTable('cities')
      table.string('street').notNullable()
      table.string('number').nullable()
      table.string('neighborhood').notNullable()
      table.string('reference_point').nullable()
      table.string('complement').nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
