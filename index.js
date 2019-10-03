const config = require('./config')
const network = require('./network')

async function main() {
    const server = new network.Server();

    server.on('session-connected', session => {
        console.log(`${session} connected`)
    })
    server.on('session-disconnected', session => {
        console.log(`${session} disconnected`)
    })
    server.on('session-timeout', session => {
        console.log(`${session} timed out`)
        session.close()
    })
    server.on('session-error', (session, error) => {
        console.log(`${session} had error: ${error}`)
        session.close()
    })
    server.on('session-data', (session, data) => {
        console.log(`${session} recv data: ${data}`)
    })

    try {
        await server.bind(config.server.port)
        console.log('server online')

        // shutdown the server after 1 minute
        setTimeout(async () => {
            await server.unbind()
            console.log('server offline')
        }, 60000)
    } catch (e) {
        console.error(`error in start-up routine: ${e}`)
    }
}

(async () => await main())()
