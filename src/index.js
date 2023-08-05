import app from './app'
import { Server as webSocketServer } from "socket.io";
import htpp from 'http'
import { connectDB } from './db';
import sockets from './sockets'

connectDB()

const server = htpp.createServer(app)
const htppServer = server.listen(3000, () => {
  console.log('Listening on port 3000')
})

const io = new webSocketServer(htppServer);
sockets(io)