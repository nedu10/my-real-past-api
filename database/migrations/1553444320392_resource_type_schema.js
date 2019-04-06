'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ResourceTypeSchema extends Schema {
  up () {
    this.create('resource_types', (table) => {
      table.increments()
      table.string('title', 254).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('resource_types')
  }
}

module.exports = ResourceTypeSchema
