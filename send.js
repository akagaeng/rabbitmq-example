const amqp = require("amqplib");

const QUEUE_NAME = "queue";
const count = Number(process.argv[2]);
const hostname = "rabbit:rabbit@localhost";

function sendMessage(channel, queue, msg) {
  channel.sendToQueue(queue, Buffer.from(msg));
  setTimeout(() => {
    channel.close();
    process.exit(0);
  }, 500);
}

if (Number.isNaN(count) || count < 1) {
  console.log("[Error] Input message count in argv[2].");
  process.exit(0);
}

const open = amqp.connect(`amqp://${hostname}`);

// Publisher
open
  .then(connection => connection.createChannel())
  .then(channel =>
    channel.assertQueue(QUEUE_NAME).then(ok => {
      if (ok) {
        for (let i = 1; i <= count; i++) {
          sendMessage(channel, QUEUE_NAME, `MSG[${i}]`);
        }
      }

      console.log(`${count} messages sent`);
    })
  )
  .catch(console.warn);
