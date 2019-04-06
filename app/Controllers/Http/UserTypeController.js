'use strict'

const UserType = use('App/Models/UserType')

class UserTypeController {
    async getAll ( {response} ) {
        const userType = await UserType.query().with('users').fetch()
        response.status(200).json({
            status: 'Success',
            message: 'Successfully fetch all user_type',
            data: userType
        })
    }
    async getOne ( {params, response} ) {
        const user_type_id = params.user_type_id

        const userType = await UserType.query().where("id", user_type_id).with('users').fetch()
        response.status(200).json({
            status: 'Success',
            message: 'Successfully fetch user_type',
            data: userType
        })
    }
}

module.exports = UserTypeController
