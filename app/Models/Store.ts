import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Category from './Category'
import PaymentMethod from './PaymentMethod'

export default class Store extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public name: string

  @column()
  public logo?: string

  @column()
  public blocked: boolean

  @column()
  public online: boolean

  @hasOne(() => User)
  public user: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Category, { foreignKey: 'storeId', localKey: 'id' })
  public categories: HasMany<typeof Category>

  @manyToMany(() => PaymentMethod, {
    pivotTable: 'store_payment_methods',
    localKey: 'id',
    pivotForeignKey: 'store_id',
    pivotRelatedForeignKey: 'payment_method_id',
    relatedKey: 'id',
  })
  public paymentMethods: ManyToMany<typeof PaymentMethod>
}
