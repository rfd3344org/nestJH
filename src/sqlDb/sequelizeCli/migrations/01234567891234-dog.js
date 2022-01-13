'use strict';

const DB_NAME = 'dog';
const getColumns = (Sequelize) => ({
  dog_age: {
    type: Sequelize.NUMBER,
  },
  id: {
    allowNull: false,
    // autoIncrement: true,
    primaryKey: true,
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
  created_at: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updated_at: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});
const getSeeds = () => [
  {
    id: 1,
    name: 'dog1',
    created_at: new Date(),
    updated_at: new Date(),
    dog_age: 1,
  },
  {
    id: 2,
    name: 'dog2',
    created_at: new Date(),
    updated_at: new Date(),
    dog_age: 12,
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(DB_NAME, getColumns(Sequelize));
    await queryInterface.bulkInsert(DB_NAME, getSeeds());
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete(DB_NAME, null, {});
    await queryInterface.dropTable(DB_NAME);
  },
};
