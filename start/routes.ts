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

  // Client
  Route.group(() => {
    Route.get('/', 'ClientsController.findAll')
  })
    .prefix('/clients')
    .middleware('auth')

  // Client
  Route.group(() => {
    Route.post('/', 'CitiesController.create')
    Route.get('/', 'CitiesController.findAll')
    Route.get('/:id', 'CitiesController.find')
    Route.put('/:id', 'CitiesController.update')
    Route.delete('/:id', 'CitiesController.delete')
  })
    .prefix('/cities')
    .middleware('auth')

  // Addresses
  Route.group(() => {
    Route.resource('/addresses', 'AddressesController').only([
      'store',
      'update',
      'destroy',
      'index',
    ])
  }).middleware('auth')
}).prefix('/api')
