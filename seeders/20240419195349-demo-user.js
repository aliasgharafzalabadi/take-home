'use strict';
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'John@example.com',
        password : bcrypt.hashSync('1234', 8),
        roleID : 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Tom',
        lastName: 'Doe',
        email: 'Tom@example.com',
        password : bcrypt.hashSync('1234', 8),
        roleID : 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'admin',
        lastName: 'admin',
        roleID : 2,
        email: 'admin@admin.com',
        password : bcrypt.hashSync('1234', 8),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
