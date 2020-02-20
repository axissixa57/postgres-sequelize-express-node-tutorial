// This will be our application entry. We'll setup our server here.
const http = require('http');
const app = require('../app'); // The express app we just created

const port = parseInt(process.env.PORT, 10) || 8000; // Глобальная переменная process.env
app.set('port', port); // при обращении app.get('port') получим номер порта

const server = http.createServer(app);
server.listen(port);