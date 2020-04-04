const amqp = require("amqplib");

const queue = "queue";
const exchange = "exchange";

const count = Number(process.argv[2]);
const hostname = "rabbit:rabbit@localhost";

if (Number.isNaN(count) || count < 1) {
  console.log("[Error] Input message count in argv[2].");
  process.exit(0);
}

const open = amqp.connect(`amqp://${hostname}`);

// Publisher
open
  .then(connection => connection.createChannel())
  .then(channel => {
    // Using exchange for delayed message
    channel.assertQueue(queue).then(ok => {
      if (ok) {
        channel
          .assertExchange(exchange, 'x-delayed-message', { arguments: { 'x-delayed-type': 'direct' } }).then(() => {
            // Creates a bind between queue and exchange
            channel.bindQueue(queue, exchange).then(() => {
              // Send messages with delay
              channel.publish(exchange, '', Buffer.from('0. my direct message'), { persistent: true, headers: { } });
              channel.publish(exchange, '', Buffer.from('3. my delayed message'), { persistent: true, headers: { 'x-delay': 10000 } });
              channel.publish(exchange, '', Buffer.from('1. my delayed message'), { persistent: true, headers: { 'x-delay': 3000 } });
              channel.publish(exchange, '', Buffer.from('4. my delayed message'), { persistent: true, headers: { 'x-delay': 12000 } });
              channel.publish(exchange, '', Buffer.from('2. my delayed message'), { persistent: true, headers: { 'x-delay': 5000 } });
            });
          });
      }

      console.log(`${count} messages sent`);
    });
  })
  .catch(console.warn);
