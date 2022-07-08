import { BaseModel, column, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import State from './State'
import Store from './Store'

export default class City extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public active: boolean

  @column()
  public stateId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => State, { foreignKey: 'id', localKey: 'stateId' })
  public state: HasOne<typeof State>

  @manyToMany(() => Store, {
    pivotTable: 'cities_stores',
    localKey: 'id',
    pivotForeignKey: 'city_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'store_id',
  })
  public stores: ManyToMany<typeof Store>
}
