import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class StorePaymentMethod extends BaseModel {
  @column({ isPrimary: true })
  public storeId: number

  @column({ isPrimary: true })
  public paymentMethodId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
}
