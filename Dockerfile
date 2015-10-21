FROM mwallasch/docker-ruby-node
EXPOSE 3000
WORKDIR /app

COPY bin/docker-setup /usr/local/bin/setup
RUN chmod a+x /usr/local/bin/setup

CMD /usr/local/bin/setup
