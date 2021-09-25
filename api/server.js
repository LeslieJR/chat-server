const express = require('express');
const cors = require('cors')
const server = express();
const routes = require('./routes');

//Middlewares
server.use(express.urlencoded({ extended: false }));
server.use(express.json()); 
server.use(cors());

//Routes
server.use('/api/users', routes.userRoutes);
server.use('/api/messages', routes.messageRoutes);

module.exports = server;