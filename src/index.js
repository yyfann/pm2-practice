const http = require('http')
const fs = require('fs')
http.createServer((req, res) => {

  if (req.url === '/') {
    const html = fs.readFileSync('./src/index.html', 'utf-8')
    res.end(html)
  }

  if (req.url === '/games/shoot/index.html') {
    const html = fs.readFileSync('./src/games/shoot/index.html', 'utf-8')
    res.end(html)
  }

  if (req.url === '/games/shoot/face.png') {
    const face = fs.readFileSync('./src/games/shoot/face.png')
    res.end(face)
  }

  if (req.url === '/games/split/index.html') {
    const html = fs.readFileSync('./src/games/split/index.html', 'utf-8')
    res.end(html)
  }

  if (req.url === '/games/split/smallLight.png') {
    const face = fs.readFileSync('./src/games/split/smallLight.png')
    res.end(face)
  }

}).listen(8005, () => {
  console.log('server is running on 8005')
})

