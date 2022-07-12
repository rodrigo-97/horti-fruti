import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateRequestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    store_id: schema.number([
      rules.exists({ table: 'stores', column: 'id' }),
      rules.unsigned(),
      rules.greathestThanOne(),
    ]),
    payment_method_id: schema.number([
      rules.exists({ table: 'payment_methods', column: 'id' }),
      rules.greathestThanOne(),
      rules.unsigned(),
    ]),
    change_money: schema.number.nullableAndOptional([rules.unsigned()]),
    comments: schema.string.nullableAndOptional({ trim: true }),
    products: schema.array([rules.minLength(1)]).members(
      schema.object().members({
        product_id: schema.number([
          rules.exists({ table: 'products', column: 'id' }),
          rules.greathestThanOne(),
        ]),
        qtd: schema.number([rules.unsigned(), rules.greathestThanOne()]),
        comments: schema.string.nullableAndOptional({ trim: true }),
      })
    ),
    address_id: schema.number([
      rules.exists({ table: 'addresses', column: 'id' }),
      rules.greathestThanOne(),
    ]),
  })

  public messages: CustomMessages = {
    'required': 'O campo {{ field }} é obrigatório',
    'unsigned': 'O campo {{ field }} aceita apenas números inteiros positivos',
    'greathestThanOne': 'O campo {{ field }} precisa ser um número inteiro positivo',
    'string': 'O campo {{ field }} precisa ser uma string',
    'number': 'O campo {{ field }} precisa ser um número',
    'minLength': 'O campo {{ field }} precisa ser no mínimo 1',
    'payment_method_id.exists': 'O método de pagamento não existe',
    'store_id.exists': 'A loja não existe',
    'products.*.product_id.exists': 'O produto não existe',
  }
}
