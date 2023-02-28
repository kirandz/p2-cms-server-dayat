const { User } = require('../models')
const { compareHash, token } = require('../helpers/index')
const { OAuth2Client } = require('google-auth-library');
class UserController {
    static async createUser(request, response, next) {
        try {
            let { userName, email, password, phoneNumber, address } = request.body
            let data = await User.create({ userName, email, password, role: 'Admin', phoneNumber, address })
            let userEmail = email
            let userId = data.id
            response.status(201).json({ userEmail, userId })
        } catch (error) {
            next(error)
            // if (error.name === "SequelizeValidationError") {
            //     let validate = []
            //     error.errors.forEach(element => {
            //         validate.push(element.message)
            //     });
            //     response.status(400).json({error:validate})
            // }
            // else if(error.name==="SequelizeUniqueConstraintError"){
            //     let validate
            //     error.errors.forEach(element => {
            //         validate=element.message
            //     })
            //     response.status(400).json({error:validate})
            // }
            // else{
            //     response.status(500).json(error)
            // }
        }
    }

    static async login(request, response, next) {
        try {
            let { email, password } = request.body
            if (!email || !password) {
                throw { name: 'Please fill requirement data' }
            }
            let user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                throw { name: 'invalidCredentials' }
            }
            let comparePassword = compareHash(password, user.password)
            if (!comparePassword) {
                throw { name: 'invalidCredentials' }
            }
            let payload = {
                id: user.id
            }
            let acessToken = token(payload)
            let emailUser = user.email
            let userName = user.userName
            let role = user.role
            response.status(200).json({ acessToken, emailUser, role,userName })
        } catch (error) {
            next(error)
            // if (error.name === 'Please fill requirement data') {
            //     response.status(401).json({ message: 'error invalid username or email or password' })
            // }
            // else if (error.name === 'invalidCredentials') {
            //     response.status(401).json({ message: 'error invalid username or email or password' })
            // }
            // else {
            //     console.log(error)
            //     response.status(500).json({ message: error })
            // }
        }
    }

    static async googleLogin(request, response, next) {
        try {
            const client = new OAuth2Client(process.env.CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: request.headers.google_token,
                audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            // If request specified a G Suite domain:
            const domain = payload['hd'];
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    email: payload.email,
                    password:'google',
                    role:"Staff",
                    userName:payload.given_name
                },
                hooks: false
            })
            let acessToken = token({id:user.id})
            let role = user.role
            let userName = user.userName
            response.status(201).json({acessToken,role,userName})      
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController