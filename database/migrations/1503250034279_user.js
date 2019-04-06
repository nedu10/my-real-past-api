'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('first_name', 254).notNullable()
      table.string('last_name', 254).notNullable()
      table.string('phone_no', 80)
      table.string('gender').notNullable()
      table.string('short_bio', 180).nullable()
      table.string('confirmation_token')
      table.text('history').nullable()
      table.boolean('is_login')
      table.boolean('is_active')
      table.datetime('last_login')
      table.integer('user_type_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
