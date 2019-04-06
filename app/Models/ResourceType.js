'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ResourceType extends Model {
    resources () {
        return this.hasMany('App/Models/Resource')
      }
}

module.exports = ResourceType
