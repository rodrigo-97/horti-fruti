import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PaymentMethod from 'App/Models/PaymentMethod'

export default class extends BaseSeeder {
  public async run() {
    await PaymentMethod.createMany([
      {
        name: 'Cartão de Crédito',
      },
      {
        name: 'Cartão de Débito',
      },
      {
        name: 'PIX',
      },
      {
        name: 'Dinheiro',
      },
    ])
  }
}
