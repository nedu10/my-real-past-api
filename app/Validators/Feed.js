'use strict'

class Feed {
  get rules () {
    return {
      // validation rules
      title: 'required|string'
    }
  }

  get messages() {
    return {
      'title.required': 'Please provide your title'
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = Feed

