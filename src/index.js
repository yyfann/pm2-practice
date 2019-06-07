const http = require('http')
const fs = require('fs')
http.createServer((req, res) => {

  console.log(req.url,'req.url')
  if (req.url === '/') {
    const shootGame = fs.readFileSync('./src/shoot-game.html', 'utf-8')
    res.end(shootGame)
  }

  if (req.url === '/l1.png') {
    console.log(33,'33')
    const l1 = fs.readFileSync('./src/l1.png')
    console.log(l1,'l1')
    res.end(l1)
  }
}).listen(8080, () => {
  console.log('server is running on 8080')
})