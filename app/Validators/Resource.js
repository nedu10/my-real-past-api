'use strict'

class Resource {
  get rules () {
    return {
      // validation rules
      name: 'required|string',
      resource_type_id: 'required'
    }
  }

  get messages() {
    return {
      'name.required': 'Please provide your name',
      'resource_type_id.required': 'Please provide your resource type id'
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = Resource
