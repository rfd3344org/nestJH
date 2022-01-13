'use strict';

const DB_NAME = 'step';
const getColumns = (Sequelize) => ({
  wizard_id: {
    type: Sequelize.STRING,
  },
  choice_id: {
    type: Sequelize.STRING,
  },
  parent_id: {
    type: Sequelize.STRING,
  },
  disabled: {
    type: Sequelize.BOOLEAN,
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
    name: 'decision1',
    created_at: new Date(),
    updated_at: new Date(),
    wizard_id: 1,
    choice_id: 1,
  },
  {
    disabled: true,
    id: 2,
    name: 'decision2',
    created_at: new Date(),
    updated_at: new Date(),
    wizard_id: 1,
    choice_id: 2,
    parent_id: 1,
    disabled: true,
  },
  {
    id: 3,
    name: 'decision3',
    created_at: new Date(),
    updated_at: new Date(),
    wizard_id: 1,
    choice_id: 2,
    parent_id: 2,
  },
  {
    id: 4,
    name: 'decision4',
    created_at: new Date(),
    updated_at: new Date(),
    wizard_id: 1,
    choice_id: 2,
    parent_id: 3,
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
