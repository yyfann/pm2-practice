const http = require('http')

http.createServer((req, res) => {
  res.end('8080')
}).listen(8080, () => {
  console.log('server is running on 8080')
})