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
    Route.group(() => {
      Route.get('/', 'ClientsController.findAll')
    }).prefix('/clients')

    // Client
    Route.group(() => {
      Route.post('/', 'CitiesController.create')
      Route.get('/', 'CitiesController.findAll')
      Route.get('/:id', 'CitiesController.find')
      Route.put('/:id', 'CitiesController.update')
      Route.delete('/:id', 'CitiesController.delete')
    }).prefix('/cities')

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
    Route.get('/requests', 'RequestsController.index')
    Route.post('/requests', 'RequestsController.store')
  }).middleware('auth')
}).prefix('/api')
