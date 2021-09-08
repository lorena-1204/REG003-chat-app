const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);
const config = require('../config');
// const cors = require('cors');

// const pkg = require('./package.json');

const { port } = config;
app.use(express.json());
app.set('port', port);

app.use(express.urlencoded({ extended: true }));
// app.use(require('./routes/index'))
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('Cliente desonectado', socket.id);
  });
  // recibe el emit de fronted
  socket.on('enviar-mensaje', (payload, callback) => {
    console.log(payload);
    // ahora el servidor emite el mensaje a otro cliente
    // el callback lleva el id al cliente en el emit
    const id = 1234;
    callback(id);
    socket.broadcast.emit('enviar-mensaje', payload);
  });
});

const servidor = server.listen(app.get('port'), () => {
  console.info(`App listening on port ${app.get('port')}`);
});

module.exports = { app, servidor };
