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

## Prerequisites
- [node.js](https://nodejs.org)
- [docker-compose](https://docs.docker.com/compose/install)

## How to start

1. Install packages

```bash
yarn    # npm install
```

2. Run broker

```bash
docker-compose up -d
```

3. Run browser to open RabbitMQ Management
- http://localhost:8080

4. `Consumer`: Receive messages from `Queue`

- Open multiple terminals

```bash
node receive.js
```

5. `Producer`: Send messages to `Queue` 

```bash
node send.js 10  # number of messages to send
```

## Resoueces
- https://www.rabbitmq.com/
- http://www.squaremobius.net/amqp.node/
- https://github.com/squaremo/amqp.node
