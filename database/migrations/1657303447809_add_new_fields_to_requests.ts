import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'requests'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.decimal('value', 10, 2).notNullable().unsigned()
      table.decimal('change_money', 10, 2).nullable().unsigned()
      table.decimal('delivery_fee', 10, 2).nullable().unsigned().defaultTo(0)
      table.string('comments').nullable()
    })
  }
}
