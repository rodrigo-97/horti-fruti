import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CitiesStore from 'App/Models/CitiesStore'
import City from 'App/Models/City'
import Request from 'App/Models/Request'
import Store from 'App/Models/Store'

export default class StoresController {
  public async show({ params, response }: HttpContextContract) {
    const storeId = +params.id

    const cities = []
    const storeCities = await CitiesStore.query().where({ storeId })

    try {
      for await (const storeCity of storeCities) {
        const c = await City.findByOrFail('id', storeCity.cityId)
        cities.push({
          id: c.id,
          city: c.name,
          feliveryFee: storeCity.deliveryFee,
        })
      }

      const store = Store.query()
        .where({ id: storeId })
        .preload('categories', (q) => {
          q.preload('products')
        })
        .preload('paymentMethods')
        .firstOrFail()

      return response.ok({
        store: store,
        cities,
      })
    } catch (error) {
      console.log(error)
      return response.badRequest()
    }
  }

  public async requests({ response, auth }: HttpContextContract) {
    const authenticatedUser = await auth.use('api').authenticate()

    try {
      const store = await Store.findByOrFail('user_id', authenticatedUser.id)
      const requests = await Request.query()
        .where({ storeId: store.id })
        .preload('client')
        .preload('requestStatus', (q) => {
          q.preload('status')
        })
        .orderBy('id', 'asc')

      return response.ok(requests)
    } catch (error) {
      console.log(error)
      return response.badRequest({
        error: 'Could not find any request from authenticated user',
      })
    }
  }
}
