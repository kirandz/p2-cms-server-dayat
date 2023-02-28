'use strict';
const fs = require('fs');
const { hash } = require('../helpers');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let data = JSON.parse(fs.readFileSync("./data/Customer.json",'utf-8'))
   data.forEach(element => {
    element.password=hash(element.password)
    element.createdAt = new Date()
    element.updatedAt = new Date()
   });
   await queryInterface.bulkInsert('Customers',data,{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Customers',null,{})
  }
};
