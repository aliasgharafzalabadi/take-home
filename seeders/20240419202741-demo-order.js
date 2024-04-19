'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Orders', [
      {
        productName:"laptop",
        quantity:2,
        pricePerUnit: 1500,
        userID : 1,
       createdAt: new Date(),
       updatedAt: new Date(),
      },
      {
        productName:"PC",
        quantity:1,
        pricePerUnit: 1500,
        userID : 2,
       createdAt: new Date(),
       updatedAt: new Date(),
      },
      {
        productName:"phone",
        quantity:5,
        pricePerUnit: 750,
        userID : 1,
       createdAt: new Date(),
       updatedAt: new Date(),
      },
      {
        productName:"shoe",
        quantity:10,
        pricePerUnit: 500,
        userID : 2,
       createdAt: new Date(),
       updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {});
  },
};
