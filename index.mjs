import dotenv from 'dotenv'
import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone.js"
import utc from "dayjs/plugin/utc.js"






dotenv.config()

dayjs.extend(utc)
dayjs.extend(timezone)

const getCurTime = () => dayjs().tz("Europe/Moscow").format('HH:mm:ss')

import { Server } from 'socket.io'
import { createServer } from "http";


const httpServer = createServer((req, res) => {
  res.end('hi')
})

const io = new Server(httpServer, {
  connectionStateRecovery: {},
  cors: {
    origin: process.env.CORS_URL,
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});


io.on('connection', (socket) => {
  socket.on('chat message', (msg, name) => {
    io.emit('chat message', msg, name, getCurTime());
  });
});

httpServer.listen(8000, () => {
  console.log('server running');
});
