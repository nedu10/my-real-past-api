'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Resource extends Model {
    resource_type () {
        return this.belongsTo('App/Models/ResourceType')
      }
      user () {
        return this.belongsTo('App/Models/User')
      }
}

module.exports = Resource
