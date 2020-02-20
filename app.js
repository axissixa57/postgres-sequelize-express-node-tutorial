const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// Log requests to the console.
app.use(logger('dev')); 

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
require('./server/routes')(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;

// bodyParser.json() - парсит тело только тех запросов, для которых 'Content-Type' равен 'application/json'. Результат парсинга сохраняется в объекте req.body
// bodyParser.urlencoded({ extended: false }) - 'Content-Type' равен 'application/x-www-form-urlencoded'. Параметр { extended: false } означает обработку параметров тела запроса как строки или массива. Поскольку данные отправляются с помощью формы, то для создания парсера применяется функция urlencoded(). В эту функцию передается объект, устанавливающий параметры парсинга. Значение extended: false указывает, что объект - результат парсинга будет представлять набор пар ключ-значение, а каждое значение может быть представлено в виде строки или массива.