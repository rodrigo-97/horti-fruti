import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import City from 'App/Models/City'

export default class CitiesController {
  public async findAll({ response }: HttpContextContract) {
    try {
      const cities = await City.query()
        .whereHas('stores', (q) => {
          q.where('blocked', false)
        })
        .preload('state')
        .preload('stores')

      if (cities.length === 0) {
        return response.notFound({ error: 'Could not find any city' })
      }

      return response.ok(cities)
    } catch (error) {
      error
      return response.badRequest({ error: 'Could not find any city' })
    }
  }
}
