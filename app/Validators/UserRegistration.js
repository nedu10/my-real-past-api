'use strict'
console.log('wow')

class UserRegistration {
  get rules () {
    return {
      // validation rules
      first_name: 'required|string',
      email: 'required|email|unique:users',
      last_name: 'required|string',
      gender: 'required|string',
      username: 'required|string|unique:users'
    }
  }

  get messages() {
    return {
      'first_name.required': 'Please provide your first name',
      'last_name.required': 'Please provide a last name',
      'gender.required': 'Please provide a gender',
      'email.required': 'Please provide an email address',
      'email.email': 'Please provide a valid email address',
      'email.unique': 'This email has already been registered',
      'username.required': 'Please provide your username',
      'username.unique': 'This username has already been registered'
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = UserRegistration
