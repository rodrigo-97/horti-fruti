import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  // App Acess
  Route.post('/login', 'AuthController.login')
  Route.post('/logout', 'AuthController.logout')

  // User Data
  Route.group(() => {
    Route.get('/me', 'AuthController.me')
  })
    .prefix('/auth')
    .middleware('auth')

  Route.group(() => {
    // Client
    Route.resource('/clients', 'ClientsController')

    // Client
    Route.resource('/cities', 'CitiesController').only([
      'store',
      'update',
      'index',
      'show',
      'destroy',
    ])

    // Addresses
    Route.resource('/addresses', 'AddressesController').only([
      'store',
      'update',
      'destroy',
      'index',
    ])

    // Store
    Route.get('/stores', 'StoresController.requests')
    Route.get('/stores/:id', 'StoresController.show')

    // Requests
    Route.resource('/requests', 'RequestsController').only(['store', 'index', 'show'])
  }).middleware('auth')
}).prefix('/api')
