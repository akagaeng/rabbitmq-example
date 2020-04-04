FROM rabbitmq:3.8-management

WORKDIR /plugins

RUN apt-get update && \
    apt-get install -y wget && \
    wget https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/v3.8.0/rabbitmq_delayed_message_exchange-3.8.0.ez && \
    rabbitmq-plugins enable rabbitmq_delayed_message_exchange
