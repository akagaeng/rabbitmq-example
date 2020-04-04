const amqp = require("amqplib");

const queue = "queue";
const maxSeconds = 5; // seconds

const hostname = "rabbit:rabbit@localhost";

function sleep(secs) {
  return new Promise(resolve => setTimeout(resolve, secs * 1000));
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// time-intensive work
async function timeIntensiveWork(secMax) {
  const secs = getRndInteger(1, secMax);
  process.stdout.write(`Working [${secs}s]...`);
  await sleep(secs);
  process.stdout.write("[DONE] \n");
}

async function startReceiveMessage(queue, channel) {
  return new Promise(resolve => {
    return channel.consume(
      queue,
      async msg => {
        resolve(msg);
      },
      { noAck: false }
    );
  });
}

async function stopReceiveMessage(consumerTag, channel) {
  return await channel.cancel(consumerTag).catch(console.error);
}

async function waitForMessage(queue, channel) {
  // Recovering unacked messages
  await channel.recover();

  return await startReceiveMessage(queue, channel).then(async msg => {
    const message = msg.content.toString();
    const { consumerTag } = msg.fields;
    process.stdout.write(
      `>> Received message: ${message}  consumerTag: ${consumerTag} \t`
    );

    // send ACK
    channel.ack(msg);

    if (message && consumerTag) {
      // Let's go for work!

      // Stop consuming
      await stopReceiveMessage(consumerTag, channel);

      // Time intensive work (seconds)
      await timeIntensiveWork(maxSeconds);

      // Go back to wait for message
      return waitForMessage(queue, channel);
    }
  });
}

const open = amqp.connect(`amqp://${hostname}`);

open
  .then(connection =>
    connection
      .createChannel()
      .then(async channel => {
        await channel.assertQueue(queue, { durable: true });
        console.log(
          " [*] Waiting for messages in %s. To exit press CTRL+C",
          queue
        );
        return channel;
      })
      .then(async channel => await waitForMessage(queue, channel))
      .catch(console.error)
  )
  .catch(console.error);
