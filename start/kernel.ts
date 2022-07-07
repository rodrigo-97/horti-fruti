import Server from '@ioc:Adonis/Core/Server'

Server.middleware.registerNamed({
  auth: () => import('App/Middleware/Auth'),
})
