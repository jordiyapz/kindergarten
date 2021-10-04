const express = require('express')
const server = express()
const port = 3000
// const PIXI = require('pixi-shim');

server.use(express.static('public'))

// const app = new PIXI.Application({ forceCanvas: true, preserveDrawingBuffer: true });

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
