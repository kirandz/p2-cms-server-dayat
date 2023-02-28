'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User,{foreignKey:'authorId',as:'user'})
      Post.belongsTo(models.Category,{foreignKey:'categoryId',as:'category'})
      Post.hasMany(models.LikePost)
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter the title'
        },notEmpty: {
          msg: 'Please enter the title'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please input your content'
        },notEmpty: {
          msg: 'Please input your content'
        }
      }
    },
    imgUrl: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    status:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  Post.beforeCreate((post)=>{
    post.status='Active'
  })
  return Post;
};