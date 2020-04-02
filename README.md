# rabbitmq-example

## Overview

```
Producer -> Message Queue (Broker) -> Consumer(s)
```

## Description
- Consumer consumes messages 
- Time-consuming task is encapsulated as a message
- Consumer stops consuming when working with a task
- Once task finished, Consumer should resume consuming

## How to start
1. Run broker

```bash
docker-compose up -d
```

2. Run browser to open RabbitMQ Management
- http://localhost:8080

3. `Consumer`: Receive messages from `Queue`

- Open multiple terminals

```bash
node receive.js
```

4. `Producer`: Send messages to `Queue` 

```bash
node send.js 10  # number of messages to send
```

## Resoueces
- https://www.rabbitmq.com/
- http://www.squaremobius.net/amqp.node/
- https://github.com/squaremo/amqp.node
