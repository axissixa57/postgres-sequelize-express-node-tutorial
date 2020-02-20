const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
// глобальный объект module, у которого ключ filename содержит путь от диска к файлу -  f:\postgres-express-react-node-tutorial\server\models\index.js, 
// basename() вернёт последнюю чать пути, т.е. название файла index.js
const basename = path.basename(module.filename); 
// If we don't have a Node environment defined, we're defaulting to development
const env = process.env.NODE_ENV || 'development'; 
// Then, we are establishing a connection with our database, 
// after which we read our models folder, discovering and importing any and all the models in it, 
// adding them to the db object and applying relationships between the models, if such relationships exist.
// вернёт объект содержащийся в development
// __dirname - путь от диска = f:\postgres-express-react-node-tutorial\server\models
const config = require(`${__dirname}/../config/config.json`)[env]; 
const db = {};

let sequelize;

// если мы работает с online database то можно в файле config.json изменить development блок на:
// "development": {
//   "use_env_variable": "DATABASE_URL"
// }
// что позволит обратиться к базе данных по адресу

if (config.use_env_variable) {
  // From the environment, extract the key with the name provided in the config as use_env_variable
  // and use that to establish a connection to our database.
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(
    config.database, config.username, config.password, config
  ); // To connect to the database, you must create a Sequelize instance; 
}

fs
  .readdirSync(__dirname) // Console: [ 'index.js', 'todo.js', 'todoitem.js' ]
  .filter(file =>
    (file.indexOf('.') !== 0) && // file.indexOf('.') !== 0 проверяет, что в имени файла точка стоит не в начале
    (file !== basename) && // не равняется index.js
    (file.slice(-3) === '.js')) // file.slice(-3) - вырезает с конца 
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file)); // Todo; TodoItem
    db[model.name] = model; // example { TodoItem: Content of TodoItem }
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) { // если например todo.js содержит ф-цию associate
    db[modelName].associate(db); // устанавливаем связи, вызываем ф-цию associate и передаём объект с моделями
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;