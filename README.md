# Generic TCP server
This project aims at creating a TCP server that will automatically handle various events that occur. See the example and events section for more info.

## Example
Here's a simple echo server implementation
```
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
