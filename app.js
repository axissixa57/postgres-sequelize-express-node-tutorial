const express = require('express');
const logger = require('morgan'); // модуль записи логов посещений
const bodyParser = require('body-parser'); // Чтобы обрабатывать запрос HTTP POST. body-parser извлекает всю часть тела входящего потока запросов и предоставляет его на req.body. Этот модуль body-parser анализирует данные JSON, буфера, строки и URL-адреса, переданные с использованием запроса HTTP POST.

// Set up the express app
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

module.exports = app; // Чтобы файл или определенный функционал был доступен в других файлах нужно использовать module.exports. Объект module.exports - это то, что возвращает функция require() при получении модуля.

// Если вы хотите обрабатывать POST запросы, то вашему приложению необходимо использовать специальный middleware — bodyParser. Подключается он очень легко: app.use(express.bodyParser()). BodyParser обрабатывает тела application/x-www-form-urlencoded и application/json запросов и выставляет для них req.body
// BodyParser занимается тем, что считывает формы, которые присланы методом post, считывает JSON-данные, которые присланы этим методом.  То есть, разбирает тело запроса. Данные, переданные через post и аналогичные методы, считываются при помощи потоков. Это асинхронное действие. BodyParser все это берет на себя, полностью считывает post, если это  JSON, тогда он его parse, и данные становятся доступны в req.body. 
// Если мы зайдем например на: http://localhost:3000/, то логгер что-то выведет. То есть, это обычный Http log запросов, dev – это формат логирования.
// app.use(logger('dev')); - Подключается логгер morgan, фиксирующий обращения к серверу. Параметр 'dev' отвечает за краткий вывод информации, подсвеченной разными цветами в зависимости от статуса ответа. Этот параметр используется на development стадии.
// bodyParser.json() - парсит тело только тех запросов, для которых 'Content-Type' равен 'application/json'. Результат парсинга сохраняется в объекте req.body
// bodyParser.urlencoded({ extended: false }) - 'Content-Type' равен 'application/x-www-form-urlencoded'. Параметр { extended: false } означает обработку параметров тела запроса как строки или массива. Поскольку данные отправляются с помощью формы, то для создания парсера применяется функция urlencoded(). В эту функцию передается объект, устанавливающий параметры парсинга. Значение extended: false указывает, что объект - результат парсинга будет представлять набор пар ключ-значение, а каждое значение может быть представлено в виде строки или массива.