/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('/admins', 'UsersController.create').middleware('admin')
  Route.get('/admins/:page/:limit', 'UsersController.index').middleware('admin')
  Route.put('/users', 'UsersController.update')
  Route.delete('/users', 'UsersController.delete')
}).middleware(['auth'])

Route.group(() => {
  Route.post('/login', 'SessionsController.login')
  Route.delete('/logout', 'SessionsController.logout')
})

Route.group(() => {
  Route.post('/forgot_passwords', 'ForgotPasswordsController.store')
  Route.put('/forgot_passwords/:token', 'ForgotPasswordsController.update')
})

Route.group(() => {
  Route.get('/clients/:status/:month/:year', 'ClientsController.index')
}).middleware(['auth', 'admin'])

Route.group(() => {
  Route.post('/transactions', 'TransactionsController.create')
  Route.get('/transactions/:user_id/:month/:year', 'TransactionsController.index').middleware(
    'admin'
  )
}).middleware(['auth'])

Route.group(() => {
  Route.get('/accounts', 'AccountsController.index')
}).middleware('auth')
