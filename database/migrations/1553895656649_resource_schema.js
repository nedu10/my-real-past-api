'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ResourceSchema extends Schema {
  up () {
    this.create('resources', (table) => {
      table.increments()
      table.string('name', 255).notNullable()
      table.text('description').nullable()
      table.string('resource_url', 500).nullable()
      table.text('content')
      table.integer('resource_type_id').notNullable()
      table.integer('user_id').notNullable()
      table.boolean('is_private').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('resources')
  }
}

module.exports = ResourceSchema
