If you do not have Docker and Docker Compose already:

* on Mac OS X or Windows, install [Docker Toolbox](https://www.docker.com/docker-toolbox), then run
  the following:
  * `docker-machine create -d virtualbox interview`
  * `docker-machine start interview`
  * `eval $(docker-machine env interview)`
* on Linux, install Docker and Docker Compose.

Then, run `bin/dev`. Use `ctrl-c` in this terminal to shut down the server. Be patient, as it
can take a few moments.

The application is running on `http://$(docker-machine ip interview):3000`. This is printed out
when running `bin/dev` but it may scroll by quickly.

If you need to access the command line of the running container, run `bin/docker-bash`.

You can lint the source code of the app with `bin/docker-lint`.
