'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LikePost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LikePost.belongsTo(models.Customer)
      LikePost.belongsTo(models.Post)
    }
  }
  LikePost.init({
    CustomerId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LikePost',
  });
  return LikePost;
};