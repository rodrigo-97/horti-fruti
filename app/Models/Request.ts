import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Address from './Address'
import Client from './Client'
import PaymentMethod from './PaymentMethod'
import RequestStatus from './RequestStatus'
import Store from './Store'

export default class Request extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public uid: string

  @column()
  public changeMoney: number | null

  @column()
  public deliveryFee: number

  @column()
  public comments: string | null

  @column()
  public value: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public clientId: number

  @column()
  public storeId: number

  @column()
  public addressId: number

  @column()
  public paymentMethodId: number

  @hasOne(() => PaymentMethod, { foreignKey: 'id', localKey: 'paymentMethodId' })
  public paymentMethod: HasOne<typeof PaymentMethod>

  @hasOne(() => Client, { foreignKey: 'id', localKey: 'clientId' })
  public client: HasOne<typeof Client>

  @hasOne(() => Store, { foreignKey: 'id', localKey: 'storeId' })
  public store: HasOne<typeof Store>

  @hasOne(() => Address, { foreignKey: 'id', localKey: 'addressId' })
  public address: HasOne<typeof Address>

  @hasMany(() => RequestStatus, { foreignKey: 'requestId', localKey: 'id' })
  public requestStatus: HasMany<typeof RequestStatus>
}
