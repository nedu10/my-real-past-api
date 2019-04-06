'use strict'

/*
|--------------------------------------------------------------------------
| ResourceTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

const ResourceType = use('App/Models/ResourceType')

class ResourceTypeSeeder {
  async run () {
    await Database.truncate('resource_types')

    const resource_types = [
      {title: 'Text'},
      {title: 'Image'},
      {title: 'PDF' },
      {title: 'Audio'},
      {title: 'Video'}
    ]

    for (let i = 0; i < resource_types.length; i++) {
      const resource_type = new ResourceType()
      resource_type.title = resource_types[i].title
      await resource_type.save()  
    }
    console.log('Successfully')

  }
}

module.exports = ResourceTypeSeeder
