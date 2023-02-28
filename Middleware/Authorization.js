const { Post } = require('../models/index')
async function deleteAuthorization(req, res, next) {
    try {
        let postId=req.params.id
        let userId = req.User.id
        let userRole = req.User.role
        let post = await Post.findOne({
            where: {
                id: postId
            }
        })
        if(!post){
            throw {name:'error not found'}
        }
        if (userId!==post.authorId && userRole!=='Admin') {
            throw{name:'You cannot delete post'}
        }
        else{
            next()
        }      
    } catch (error) {
        next(error)
    }
}

async function updatestatusAuthorization(req, res, next) {
    try {
        let postId=req.params.id
        let userRole = req.User.role
        let post = await Post.findOne({
            where: {
                id: postId
            }
        })
        if(!post){
            throw {name:'error not found'}
        }
        if (userRole!=='Admin') {
            throw{name:'You cannot update this post'}
        }
        else{
            next()
        }      
    } catch (error) {
        next(error)
    }
}

async function updateAuthorization(req, res, next) {
    try {
        let postId=req.params.id
        let userId = req.User.id
        let userRole = req.User.role
        let post = await Post.findOne({
            where: {
                id: postId
            }
        })
        if(!post){
            throw {name:'error not found'}
        }
        if (userId!==post.authorId && userRole!=='Admin') {
            throw{name:'You cannot update this post'}
        }
        else{
            next()
        }      
    } catch (error) {
        next(error)
    }
}

module.exports={deleteAuthorization,updateAuthorization,updatestatusAuthorization}