module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false, // added a not-null constraint. This means that the database will not allow us to write to it if we don't provide a value for the title field
    },
  });

  Todo.associate = (models) => {
    Todo.hasMany(models.TodoItem, {
      foreignKey: 'todoId',
      as: 'todoItems', // The as: 'todoItems' means that every time we query for a todo and include it's todo items, they'll be included under the key todoItems instead of TodoItems (Sequelize defaults to using the pluralized model name).
    });
  }; // We also defined the relationship between a Todo and it's TodoItems in the Todo.associate class method

  return Todo;
};                            