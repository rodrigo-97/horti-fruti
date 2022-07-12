import { validator } from '@ioc:Adonis/Core/Validator'
import {} from '@ioc:Adonis/Core/Helpers'

validator.rule('greathestThanOne', (value, _, options) => {
  if (typeof value !== 'number') {
    return
  }

  if (value < 1) {
    options.errorReporter.report(
      options.pointer,
      'greathestThanOne',
      'greathestThanOne validation failed',
      options.arrayExpressionPointer
    )
  }
})
