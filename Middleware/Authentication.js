const {decodeToken}=require('../helpers/index')
const { User,Customer} = require('../models/index')
async function authentication(req, res, next) {
    try {
        let acess_Token = req.headers.acesstoken
        if(!acess_Token){
            throw{name:'Unauthorized'}
        }
        let payload = decodeToken(acess_Token)
        let user = await User.findOne({
            where: {
                id: payload.id
            }
        })
        if (user) {
            req.User = {
                id:user.id,
                role:user.role,
                email:user.email
            }
            next()
        }
        else{
            throw{name:'Unauthorized'}
        }      
    } catch (error) {
        next(error)
    }
}

async function customerAuthentication(req, res, next) {
    try {
        let acess_Token = req.headers.acesstoken
        if(!acess_Token){
            throw{name:'Unauthorized'}
        }
        let payload = decodeToken(acess_Token)
        let customer = await Customer.findOne({
            where: {
                id: payload.id
            }
        })
        if (customer) {
            req.currentCustomer = {
                id:customer.id
            }
            next()
        }
        else{
            throw{name:'Unauthorized'}
        }      
    } catch (error) {
        next(error)
    }
}



module.exports={authentication,customerAuthentication}