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
    Route.post('/', 'ClientsController.create')
    Route.get('/', 'ClientsController.findAll')
    Route.get('/:id', 'ClientsController.find')
    Route.put('/:id', 'ClientsController.update')
    Route.delete('/:id', 'ClientsController.delete')
  })
    .prefix('/clients')
    .middleware('auth')
}).prefix('/api')
