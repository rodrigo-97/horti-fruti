import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Status from 'App/Models/Status'

export default class extends BaseSeeder {
  public async run() {
    await Status.createMany([
      {
        status: 'RECEIVED_REQUEST',
      },
      {
        status: 'IN_PROGRESS',
      },
      {
        status: 'ON_DELIVERY_ROUTE',
      },
      {
        status: 'DELIVERED_REQUEST',
      },
      {
        status: 'NOT_DELIVERED',
      },
      {
        status: 'CANCELED',
      },
    ])
  }
}
