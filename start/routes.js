'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

// User Routes
Route.post("/register", "UserController.register").validator("UserRegistration")
Route.post("/login", "UserController.login")
Route.post("/create-password/:confirmation_token", "UserController.create_password")
Route.get("/users", "UserController.all_users")
Route.get("/regular-users", "UserController.all_regular_users")
Route.get("/admins", "UserController.all_admins")
Route.get("/users/:user_id", "UserController.single_user")
Route.put("/users/:user_id", "UserController.update").validator("UserRegistration").middleware(['auth'])
Route.get("profile", "UserController.profile").middleware(['auth'])

// UserTypes
Route.group(() => {
  Route.get('/', 'UserTypeController.getAll')
  Route.get('/:user_type_id', 'UserTypeController.getOne')
}).prefix('/api/user_type')

//Feed Route

Route.group(() => {
  Route.post('/create-feed', "FeedController.createFeed").validator("Feed").middleware(['auth'])
  Route.get('/', "FeedController.getAllFeed").middleware(['auth'])
  Route.get('/user-feed', "FeedController.getUserFeed").middleware(['auth'])
  Route.get('/:feed_id', "FeedController.getSingleFeed").middleware(['auth'])
  Route.delete('/:feed_id', "FeedController.deleteFeed").middleware(['auth', 'deletePriviledge'])
}).prefix('/api/feeds')

// ResourceTypes
Route.group(() => {
  Route.get('/', 'ResourceTypeController.getAll')
  Route.get('/:resource_type_id', 'ResourceTypeController.getOne')
}).prefix('/api/resource_type')

// Resource
Route.group(() => {
  Route.post('/', 'ResourceController.createResource').validator("Resource").middleware(['auth'])
  Route.get('/', 'ResourceController.getAll')
  Route.get('/my-resource', 'ResourceController.getMyResource').middleware(['auth'])
  Route.get('/:resource_id', 'ResourceController.getSingleResource').middleware(['auth'])
  Route.get('/user/:user_id', 'ResourceController.getUserResource').middleware(['auth'])
  Route.put('/:resource_id', 'ResourceController.updateResource').validator("Resource").middleware(['auth', 'deletePriviledge'])
}).prefix('/api/resource')