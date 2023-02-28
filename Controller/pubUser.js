const { Customer, Category, User, Post, LikePost } = require("../models/index")
const { token, compareHash } = require('../helpers/index')
const { Op } = require("sequelize")
const { OAuth2Client } = require('google-auth-library');
class PubUserController {
    static async register(request, response, next) {
        try {
            let { userName, email, password, phoneNumber, address } = request.body
            console.log(email)
            let data = await Customer.create({ userName, email, password, role: 'Customer', phoneNumber, address })
            let customerEmail = email
            let customerId = data.id
            response.status(201).json({ customerEmail, customerId })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    static async login(request, response, next) {
        try {
            let { email, password } = request.body
            if (!email || !password) {
                throw { name: 'Please fill requirement data' }
            }
            let customer = await Customer.findOne({
                where: {
                    email: email
                }
            })
            if (!customer) {
                throw { name: 'invalidCredentials' }
            }
            let comparePassword = compareHash(password, customer.password)
            if (!comparePassword) {
                throw { name: 'invalidCredentials' }
            }
            let payload = {
                id: customer.id,
            }
            let acessToken = token(payload)
            let userName = customer.userName
            response.status(200).json({ acessToken, userName })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    static async showPosts(request, response, next) {
        try {
            let paramQuerySql = {
                include: [{
                    model: Category,
                    as: 'category'
                }, { model: User, as: 'user', attributes: ['email', 'role', 'userName'] }],
                order: [['createdAt', 'DESC']],
            }
            let { filter, page } = request.query
            let limit
            let offset
            if (filter !== '' && typeof filter !== 'undefined') {
                const query = filter.split(',').map((item) => ({
                    categoryId: item
                }))
                paramQuerySql.where = {
                    [Op.or]: query,
                    status: 'Active'
                }
            }
            else {
                paramQuerySql.where = {
                    status: 'Active'
                }
            }
            if (page) {
                let splitPage = page.split(',')
                if (splitPage[0]) {
                    limit = splitPage[0]
                    paramQuerySql.limit = limit
                }
                if (splitPage[1]) {
                    offset = splitPage[1] * limit - limit
                    paramQuerySql.offset = offset
                }
                // limit = 5
                // paramQuerySql.offset = limit * page - limit
            }
            else{
                limit=5
                offset=0
                paramQuerySql.limit=limit
                paramQuerySql.offset=offset
            }

            let { count, rows } = await Post.findAndCountAll(paramQuerySql)
            response.status(200).json({
                items: rows,
                totalPage: Math.ceil(count / limit)
            })
            // let data = await Post.findAll(paramQuerySql)
            // response.status(200).json(data)
        }
        catch (error) {
            console.log(error)
            next(error)
        }
    }
    static async favoriteShowPosts(request, response, next) {
        try {
            let customerId = request.currentCustomer.id
            let paramQuerySql = {
                include: {
                    model: Post,
                    include: {
                        model: Category,
                        as: 'category'
                    },
                },
                where: {
                    CustomerId: customerId
                },
                order: [['createdAt', 'DESC']],
            }
            let data = await LikePost.findAll(paramQuerySql)
            response.status(200).json(data)
        }
        catch (error) {
            console.log(error)
            next(error)
        }
    }
    static async addFavoritePost(req, res, next) {
        try {
            let PostId = req.params.postId
            let CustomerId = req.currentCustomer.id
            let likePost = await LikePost.findOne({
                where:{
                    PostId:PostId,
                    CustomerId:CustomerId
                }
            })
            if(likePost){
                throw{name:"Post has been already added to Favorite Posts"}
            }
            let post = await Post.findByPk(PostId)
            if (!post) {
                throw { name: 'error not found' }
            }
            let data = await LikePost.create({ PostId, CustomerId })
            res.status(201).json({ CustomerId: data.CustomerId, PostId: data.PostId })
        } catch (error) {
            next(error)
        }
    }
    static async detailPost(req, res, next) {
        try {
            let postId = req.params.postId
            let post = await Post.findOne({
                include:[{
                    model:Category,
                    as:'category',
                },{
                    model:User,
                    as:'user',
                    attributes:["userName"] 
                }],
                where:{
                    id:postId
                }
            })
            if (!post) {
                throw { name: 'error not found' }
            }
            res.status(200).json(post)
        } catch (error) {
            next(error)
        }
    }
    static async showCategories(request, response, next) {
        try {
            let data = await Category.findAll()
            response.status(200).json(data)
        } catch (error) {
            next(error)
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
            const [customer, created] = await Customer.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    email: payload.email,
                    password:'google',
                    role:"Customer",
                    userName:payload.given_name
                },
                hooks: false
            })
            let acessToken = token({id:customer.id})
            let userName = customer.userName
            response.status(201).json({acessToken,userName})      
        } catch (error) {
            next(error)
        }
    }
}
module.exports = PubUserController