import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAddressValidator {
  constructor(protected ctx: HttpContextContract, protected body = ctx.request.body()) {}

  public schema = schema.create({
    street: schema.string({ trim: true }, [rules.minLength(3)]),
    neighborhood: schema.string({ trim: true }, [rules.minLength(3)]),
    city_id: schema.number([rules.exists({ column: 'id', table: 'cities' })]),
    number: schema.string.nullableAndOptional({ trim: true }),
    reference_point: schema.string.nullableAndOptional({ trim: true }),
    complement: schema.string.nullableAndOptional({ trim: true }),
  })

  public messages: CustomMessages = {
    'required': 'O campo {{ field }} é obrigatório',
    'street.minLength': 'O campo {{ field }} precisa ter no mínimo 3 caracteres',
    'neighborhood.minLength': 'O campo {{ field }} precisa ter no mínimo 3 caracteres',
    'city_id.exists': `A cidade com o id ${this.body.city_id} não existe`,
  }
}
