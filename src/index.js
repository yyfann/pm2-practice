const http = require('http')

http.createServer((req, res) => {
  res.end('aa 8080')
}).listen(8080, () => {
  console.log('server is running on 8080')
})