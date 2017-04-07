const Server = require('./src/server')
const initMock = require('./src/init')

function MockServer({
  mock = 'mock',
  watch = false,
  port = 3000,
  base = '/'
}) {
  const server = new Server(port)
  if (watch) {
    let chokidar = require('chokidar')
    let watcher = chokidar.watch(mock)
    server.watch(initMock(mock, base))
    watcher.on('change', (path) => {
      if (/\.json$/i.test(path)) {
        server.update(initMock(mock, base), path)
      }
    })
  } else {
    server.start(initMock(mock, base))
  }
}

module.exports = MockServer
