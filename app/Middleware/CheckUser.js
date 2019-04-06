'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class CheckUser {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, auth }, next) {
    // call next to advance the request
    const authUser = await auth.getUser()

    try {
      const checkAuthUserType = await UserType.query().where('id', authUser.user_type_id).first()
      if (checkAuthUserType.title == 'user') {
        return await next()
      } else {
        return response.status(401).json({
          status: 'Failed',
          message: 'UnAuthorized access'
        })
      }
    } catch (error) {
      console.log(error)
      return response.status(500).json({
        status: 'Failed',
        message: 'Internal server error'
      })
    }
  }
}

module.exports = CheckUser
