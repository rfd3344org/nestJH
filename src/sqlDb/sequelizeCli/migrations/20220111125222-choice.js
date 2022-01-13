'use strict';

const DB_NAME = 'choice';
const getColumns = (Sequelize) => ({
  decision_id: {
    type: Sequelize.STRING,
  },
  id: {
    allowNull: false,
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
    name: 'choice1',
    created_at: new Date(),
    updated_at: new Date(),
    decision_id: 1,
  },
  {
    id: 2,
    name: 'choice2',
    created_at: new Date(),
    updated_at: new Date(),
    decision_id: 1,
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
