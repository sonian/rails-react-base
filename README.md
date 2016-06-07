If you do not have Docker and Docker Compose already:

* on Mac OS X or Windows, install [Docker Toolbox](https://www.docker.com/docker-toolbox), then run
  the following:
  * `docker-machine create -d virtualbox default`
  * `docker-machine start default`
  * `eval $(docker-machine env default)`
* on Linux, install Docker and Docker Compose.

Then, run `bin/dev`. Use `ctrl-c` in this terminal to shut down the server. Be patient, as it
can take a few moments.

If you need to access the command line of the running container, run `bin/docker-bash`.

You can lint the source code of the app with `bin/docker-lint`.
