import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Address from 'App/Models/Address'
import CitiesStore from 'App/Models/CitiesStore'
import Client from 'App/Models/Client'
import Product from 'App/Models/Product'
import Request from 'App/Models/Request'
import RequestProduct from 'App/Models/RequestProduct'
import RequestStatus from 'App/Models/RequestStatus'
import CreateRequestValidator from 'App/Validators/CreateRequestValidator'
import { v4 as uuid } from 'uuid'

export default class RequestsController {
  public async store({ auth, response, request }: HttpContextContract) {
    const trx = await Database.transaction()
    const payload = await request.validate(CreateRequestValidator)
    const uid = uuid()

    try {
      const authenticatedUser = await auth.use('api').authenticate()
      const address = await Address.findByOrFail('id', payload.address_id)
      const client = await Client.findByOrFail('user_id', authenticatedUser.id)

      const store = await CitiesStore.query()
        .where({ storeId: payload.store_id })
        .where({ cityId: address.cityId })
        .firstOrFail()

      const productsFromRequest = await Promise.all(
        payload.products.map((e) => {
          return Product.findByOrFail('id', e.product_id)
        })
      )

      const totalRequestAmount =
        productsFromRequest.reduce((c, p, i) => {
          return c + Number(p.price * payload.products[i].qtd)
        }, 0) + Number(store.deliveryFee)

      if (payload.change_money && payload.change_money < totalRequestAmount) {
        trx.rollback()
        return response.badRequest({ error: 'Change money is lesser than reques total value' })
      }

      const request = await Request.create({
        addressId: address.id,
        clientId: client.id,
        changeMoney: payload.change_money,
        comments: payload.comments,
        deliveryFee: +store.deliveryFee,
        paymentMethodId: payload.payment_method_id,
        storeId: store.storeId,
        uid,
        value: totalRequestAmount,
      })

      await Promise.all(
        payload.products.map(async (e) => {
          const product = await Product.findByOrFail('id', e.product_id)
          return RequestProduct.create({
            requestId: request.id,
            productId: product.id,
            qtd: e.qtd,
            comments: e.comments,
            value: product.price,
          })
        })
      )

      const requestStatus = await RequestStatus.create({ requestId: request.id, statusId: 1 })
      trx.commit()

      return response.ok({
        request,
        requestStatus,
      })
    } catch (error) {
      console.log(error)
      trx.rollback()
      return response.badRequest({ error: 'Could not create request' })
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      const requests = await Request.query()
        .preload('paymentMethod')
        .preload('requestStatus')
        .preload('store')

      if (requests.length === 0) {
        return response.notFound({ error: 'Could not find any request' })
      }

      return response.ok(requests)
    } catch (error) {
      return response.badRequest({ error: 'Could not find requests' })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const requests = await Request.query()
        .preload('paymentMethod')
        .preload('requestStatus')
        .preload('store')
        .where({ id: params.id })

      if (requests.length === 0) {
        return response.notFound({ error: 'Could not find any request' })
      }

      return response.ok(requests)
    } catch (error) {
      return response.badRequest({ error: 'Could not find requests' })
    }
  }
}
