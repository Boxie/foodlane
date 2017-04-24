# Foodlane

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ab011d6fa45948589ff8b2775b5c265a)](https://www.codacy.com/app/Boxie/foodlane?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Boxie/foodlane&amp;utm_campaign=Badge_Grade)

### Installation

Foodlane requires [Docker](https://www.docker.com/) and [npm](https://www.npmjs.com/) to run.

Download the project and navigate to the project root directory.

```sh
$ cd app
$ npm install
```

After loading all project dependencies return to the project root directory, build docker-compose images and start foodlane via docker-compose

```sh
$ cd ..
$ docker-compose build # build images
$ docker-compose up # start servers
```

Verify the installation by navigating to your server address in your preferred browser.

```sh
localhost:3000
```
### Plugins

Foodlane is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Change-case | https://github.com/blakeembrey/change-case |
| client-sessions | https://github.com/mozilla/node-client-sessions |
| config | https://github.com/lorenwest/node-config |
| express | http://expressjs.com/de/ |
| express-generator | http://expressjs.com/de/starter/generator.html |
| nano | https://github.com/dscape/nano |
| nodemon | https://github.com/remy/nodemon |
| passport | https://github.com/jaredhanson/passport |
| passport-local | https://github.com/jaredhanson/passport-local |
| require-dir | https://github.com/aseemk/requireDir |
| winston | https://github.com/winstonjs/winston |