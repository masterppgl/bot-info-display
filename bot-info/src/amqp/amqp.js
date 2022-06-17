import {AMQPWebSocketClient} from './amqp-websocket-client.mjs'

export default async () => {
    console.log("trying to connect")
      const url = `wss://rabbitmqrelay.yapashop.com/`
      const amqp = new AMQPWebSocketClient(url, "/", "hafizsheetab", "sheetabhafiz")
      console.log("trying to connect 1")
    const connection = await amqp.connect()
    console.log("trying to connect to channel")
    const channel = await connection.channel()
    console.log("amqp connected")
    return {connection, channel}
}