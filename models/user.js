'use strict';
const {
  Model
} = require('sequelize');
const {hash}= require('../helpers/index')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post,{foreignKey:'authorId'})
    }
  }
  User.init({
    userName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
        msg:'Email has been used'
      },
      validate: {
        notEmpty: {
          msg: 'Please input your email'
        },notEmpty: {
          msg: 'Please input your email'
        },isEmail:{
          msg:'Format email must be valid'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please input your password'
        },notEmpty: {
          msg: 'Please input your password'
        },len:{
          args:[5],
          msg:'Password must be at least 5 letters'
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user)=>{
    user.password=hash(user.password)
  })
  return User;
};