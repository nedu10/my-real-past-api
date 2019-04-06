'use strict'

const User = use("App/Models/User");
const Hash = use("Hash");
const random_string = require("random-string");

class UserController {
    async register ({request, response})  {
        try {
            let token = random_string({ length: 40 })
            const userData = request.only(['first_name', 'user_type_id', 'last_name', 'username',  'email', 'password', 'phone_no', 'gender', 'confirmation_token',])
            userData.password = 'myrealpast@default'
            userData.confirmation_token = token
            const user = await User.create(userData)
            response.json({
                status: "Success",
                message: "Successfully registered User",
                data: user
            })
        } catch (error) {
            console.log(error)
        }
    }
    async all_users ({response}) {
        try {
            const users = await User.query().with('user_type').fetch()
            response.json({
                status: "Success",
                Message: "Successfully get all user",
                data: users
            })
        } catch (error) {
            console.log(error)
            
        }
    }
    async all_regular_users ({response}) {
        try {
            const users = await User.query().where('user_type_id', 1).with('user_type').fetch()
            response.json({
                status: "Success",
                Message: "Successfully get all regular user",
                data: users
            })
        } catch (error) {
            console.log(error)
            
        }
    }
    async all_admins ({response}) {
        try {
            const users = await User.query().where('user_type_id', 2).with('user_type').fetch()
            response.json({
                status: "Success",
                Message: "Successfully get all admins",
                data: users
            })
        } catch (error) {
            console.log(error)
            
        }
    }
    async create_password({request, params, response}) {
        try {
            const {password} = request.post()
            const {confirmation_token} = params
            const findUser = await User.query().where("confirmation_token", confirmation_token).first()
            if (!findUser) {
                throw response.json({
                    status: "Failed",
                    Message: "Opps you cannot be on this page"
                })
            }
            findUser.confirmation_token = null
            findUser.password = password
            await findUser.save()
            response.json({
                status: "Success",
                Message: "Successfully created password"
            })    
        } catch (error) {
            console.log(error)
        }
    }
    async login({ request, auth, response }) {
        try {
          const {email, password} = request.post();
    
          const checkLoginUser = await User.query()
            .where("email", email)
            .first();

            if (!checkLoginUser) {
                throw response.status(400).json({
                    status: 'Failed',
                    message: 'Invalid Credentials',
                    details: 'User does not exist'
                })
            }

            const verifyPassword = await Hash.verify(password, checkLoginUser.password)

            if (!verifyPassword) {
                throw response.status(400).json({
                    status: 'Failed',
                    message: 'Wrong password'
                })
            }

            const loginUser = await auth.generate(checkLoginUser, true)
 
            checkLoginUser.is_login = true;
            await checkLoginUser.save();
    
            return response.status(202).json({
                status: 'Success',
                message: 'Successfully logged in',
                token: loginUser
            })
        } catch (error) {
          console.log(error)
          
        }
      }
    async profile ({auth, response}){
        try {
            const user = await User.query().where("id", auth.current.user.id).with('user_type').with("feeds").first()
            return response.json({
                status: "Success",
                Message: "Successfully fetch user",
                data: user
            })
        } catch (error) {
            console.log(error)
        }
    }
    async single_user({params, response}){
        try {
            const {user_id} = params
            const singleUser = await User.query().where("username", user_id).with('user_type').first()
            if (!singleUser) {
                throw response.json({
                    status: "Failed",
                    Message: "User does not exist"
                })
            }

            return response.json({
                status: "Success",
                Message : "Successfully fetch single user",
                data: singleUser
            })
        } catch (error) {
            console.log(error)
        }
        
    }
}

module.exports = UserController
