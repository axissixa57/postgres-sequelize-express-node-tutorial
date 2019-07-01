// миграции нужны чтобы создать таблицы в бд с помощью $ sequelize db:migrate
// Sequelize automatically generates the id, createdAt and updatedAt fields for you. 
// In addition to that, any time a model is saved, the updatedAt field is automatically updated to reflect the new update time.
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Todos'),
};