'use strict'

/*
|--------------------------------------------------------------------------
| UserTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

const UserType = use('App/Models/UserType')

class UserTypeSeeder {
  async run () {
    await Database.truncate('user_types')

    const user_types = [
      {title: 'user' },
      {title: 'admin'}
    ]

    for (let i = 0; i < user_types.length; i++) {
      const user_type = new UserType()
      user_type.title = user_types[i].title
      await user_type.save()  
    }
    console.log('Successfully')

  }
}

module.exports = UserTypeSeeder
