/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const CategoriesController = () => import('#controllers/categories_controller')

const AuthController = () => import('#controllers/auth_controller')

router
  .group(() => {
    router.post('/login', [AuthController, 'login'])
    router.post('/register', [AuthController, 'register'])

    router.resource('categories', CategoriesController).only(['index', 'show'])

    router
      .group(() => {
        router.resource('categories', CategoriesController).only(['update', 'store', 'destroy'])
      })
      .use(middleware.auth())
  })
  .prefix('api')
