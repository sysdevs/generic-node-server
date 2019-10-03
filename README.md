# Generic TCP server
This project aims at creating a TCP server that will automatically handle various events that occur. See the example and events section for more info.

## Example
Here's a simple echo server implementation
```javascript
const network = require('network')
const server = new network.Server()

server.on('session-data', (session, data) => {
    console.log(`${session} sent ${data}`)
    session.write(data)
    // await session.write(data) [waits for the data to be written]
})

await server.bind(1234)

// ... some time later

await server.unbind()
```
## Events
Server  
* 'session-connected' - *a new connection has been accepted*
* 'session-disconnected' - *a connection has been closed*
* 'session-error' - *an error was produced by a session's socket*
* 'session-data' - *data was received*
* 'session-timeout' - *no incoming/outgoing traffic had happened within a timeframe*

## License
GNU General Public License v3.0  
See LICENSE