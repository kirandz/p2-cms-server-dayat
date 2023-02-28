const { User, Post, Category, Log } = require('../models/index')
const { Op } = require("sequelize")
class PostController {
    static async showPosts(request, response, next) {
        try {
            let paramQuerySql = {
                include: [{
                    model: Category,
                    as: 'category'
                }, { model: User, as: 'user', attributes: ['email', 'role', 'userName'] }],
                order: [['createdAt', 'DESC']],
            }
            let data = await Post.findAll(paramQuerySql)
            response.status(200).json(data)
        }
        catch (error) {
            next(error)
        }
    }

    static async createPost(request, response, next) {
        try {
            let authorEmail = request.User.email
            let authorId = request.User.id
            let { title, content, imgUrl, categoryId } = request.body
            let data = await Post.create({ title, content, imgUrl, categoryId, authorId })
            let createLog = await Log.create({
                postName: data.title,
                description: `Post with id ${data.id} created`,
                updatedBy: authorEmail
            })
            response.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async showPost(request, response, next) {
        try {
            let id = request.params.id
            let data = await Post.findByPk(id)
            if (!data) {
                throw { name: 'error not found' }
            }
            response.status(200).json(data)
        } catch (error) {
            next(error)
            // if(.name==='error not found'){
            //     .status(404).json({.name})
            // }
            // else{
            //     .status(500).json({ : 'internal server error' })
            // }
        }
    }

    static async deletePost(request, response, next) {
        try {
            let id = +request.params.id
            let data = await Post.destroy(
                {
                    where:
                        { id: id }
                })
            // if(data===0){
            //     throw {name:'error not found'}
            // }    
            response.status(200).json({ message: 'Post success to delete' })
        } catch (error) {
            next(error)
            // console.log(error)
            // if(error.name === 'error not found'){
            //     response.status(404).json({message:error.name})
            // }
            // else{
            //     response.status(500).json({ message: 'internal server error' })
            // }   
        }
    }

    static async updatePost(request, response, next) {
        try {
            let id = request.params.id
            let { title, content, imgUrl, categoryId } = request.body
            let updatedPost = await Post.update(
                { title, content, imgUrl, categoryId }, {
                where: {
                    id: id
                }
            }
            )
            let authorEmail = request.User.email
            let createLog = await Log.create({
                postName: title,
                description: `Post with id ${id} updated `,
                updatedBy: authorEmail
            })
            response.status(200).json({ message: createLog.description })
        }
        catch (error) {
            next(error)
        }
    }

    static async updateStatusPost(request, response, next) {
        try {
            let id = request.params.id
            let status = request.params.status
            let post = await Post.findOne({
                where: {
                    id: id
                }
            })
            if (!post) {
                throw { name: 'error not found' }
            }
            let updatedPost = await Post.update({ status }, { where: { id: post.id } })
            let user = request.User.email
            let createLog = await Log.create({
                postName: post.title,
                description: `Post status with id ${id} has been updated from ${post.status} to ${status}`,
                updatedBy: user
            })
            response.status(200).json({ message: createLog.description })
        }
        catch (error) {
            next(error)
        }
    }
}
module.exports = PostController