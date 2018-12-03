const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(server, {});
const uuidv4 = require('uuid/v4');

const SOCKET_LIST = {}

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/index.html'));
})
app.use('/client', express.static(path.resolve(__dirname, './client')));

app.set('PORT', 2000);
server.listen(app.get('PORT'), (err) => {
  if(err) {
    throw err;
  }
  console.log(`Server started on PORT: ${app.get('PORT')}`);
});

io.sockets.on('connection', (socket) => {
  socket.id = uuidv4();
  socket.x = 0;
  socket.y = 0;
  SOCKET_LIST[socket.id] = socket;
  console.log('Socket connection');
})

setInterval(() => {
  for (const socket in SOCKET_LIST) {
      const sock = SOCKET_LIST[socket];
      sock.x++;
      sock.y++;
      sock.emit('newPos', {
        x: socket.x,
        y: socket.y
      });
    }
}, 1000/25);
