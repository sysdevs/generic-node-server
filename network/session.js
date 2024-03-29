const config = require('./../config')
const EventEmitter = require('events').EventEmitter
const uuid = require('uuid/v4')

function attachListeners(session) {
    session.socket.on('close', () => session.emit('close'))
    session.socket.on('data', data => session.emit('data', data))
    session.socket.on('error', error => session.emit('error', error))
    session.socket.on('timeout', () => session.emit('timeout'))

    if (config.session.timeout) {
        session.socket.setTimeout(config.session.timeout)
    }
}

class Session extends EventEmitter {
    constructor(server, socket) {
        super()
        this.server = server
        this.socket = socket
        this.generateIdentifier()
        attachListeners(this)
    }
    close() {
        if (!this.socket.destroyed) {
            this.socket.destroy()
        }
    }
    async write(data) {
        return new Promise((resolve, reject) => {
            this.socket.write(data, () => resolve)
        })
    }
    generateIdentifier() {
        this.identifier = uuid()
    }
    toString() {
        return `Session[${this.identifier}]`
    }
}

module.exports = Session
