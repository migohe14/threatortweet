const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const router = require('./router');
// initializing server
const app = express();
const server= http.createServer(app);
const io = socketio.listen(server);
const path = require('path');
const cors = require('cors');


app.use(router);
app.use(cors());

// settings 
app.set('port', process.env.PORT || 3001);

// sockets
require('./sockets')(io);

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log("Server on port " + port);
});