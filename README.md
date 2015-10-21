Install [Docker Toolbox](https://www.docker.com/docker-toolbox), then run
`docker-compose build` and `docker-compose up`.
The app will be running on `http://$(docker-machine ip default):3000/`.
Use `ctrl-c` in the `docker-compose` terminal to shut down the machines.

If you need to access the command line of the running container, run `bin/docker-bash`.

If you're on Linux, install Docker and Docker Compose.
