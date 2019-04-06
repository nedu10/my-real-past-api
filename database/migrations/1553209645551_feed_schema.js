'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FeedSchema extends Schema {
  up () {
    this.create('feeds', (table) => {
      table.increments()
      table.string("title", 254).notNullable()
      table.text('content').nullable()
      table.integer('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('feeds')
  }
}

module.exports = FeedSchema
