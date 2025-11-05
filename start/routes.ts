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

const UsersController = () => import('#controllers/users_controller')

const TagsController = () => import('#controllers/tags_controller')

const PostsController = () => import('#controllers/posts_controller')

const CategoriesController = () => import('#controllers/categories_controller')

const AuthController = () => import('#controllers/auth_controller')

router
  .group(() => {
    router.post('/login', [AuthController, 'login'])
    router.post('/register', [AuthController, 'register'])

    router.resource('categories', CategoriesController).only(['index', 'show'])
    router.resource('posts', PostsController).only(['index', 'show'])
    router.resource('tags', TagsController).only(['index', 'show'])
    router.get('users/:id', [UsersController, 'show'])

    router
      .group(() => {
        router.resource('categories', CategoriesController).only(['update', 'store', 'destroy'])
        router.resource('posts', PostsController).only(['update', 'store', 'destroy'])
        router.resource('users', UsersController).only(['update', 'destroy'])
      })
      .use(middleware.auth())
  })
  .prefix('api')
