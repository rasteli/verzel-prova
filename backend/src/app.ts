import "dotenv/config"

import cors from "cors"
import http from "http"
import express from "express"
import { Server } from "socket.io"

import { routes } from "./routes"

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

app.use(cors())

app.use(express.json())
app.use(routes)

io.on("connection", socket => {
  console.log(`Socket connected: ${socket.id}`)
})

export { io, server }
