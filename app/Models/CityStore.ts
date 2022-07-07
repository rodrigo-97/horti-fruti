import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class CityStore extends BaseModel {
  @column({ isPrimary: true })
  public cityId: number

  @column({ isPrimary: true })
  public storeId: number

  @column()
  public deliveryFee: number
}
