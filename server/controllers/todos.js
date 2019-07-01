const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
  create(req, res) {
    return Todo
      .create({ // Для добавления данных в бд у модели вызывается метод create(), в который передается добавляемый объект
        title: req.body.title,
      })
      .then(todo => res.status(201).send(todo))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Todo
      //.findAll() // поиск всех записей
      .findAll({
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }], // создаст свойство в объекте Todo с массивом из TodoItems 
      })
      .then(todos => res.status(200).send(todos))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Todo
      .findByPk(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
      })
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return res.status(200).send(todo);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Todo
      .findByPk(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
      })
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return todo
          .update({
            title: req.body.title || todo.title,
          })
          .then(() => res.status(200).send(todo))  // Send back the updated todo.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return Todo
      .findByPk(req.params.todoId)
      .then(todo => {
        if (!todo) {
          return res.status(400).send({
            message: 'Todo Not Found',
          });
        }
        return todo
          .destroy()
          //.then(() => res.status(204).send()) // 1 вариант, без разницы какой использовать
          .then(() => res.status(200).send({ message: 'Todo deleted successfully.' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};