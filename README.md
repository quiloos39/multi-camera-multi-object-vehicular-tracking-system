# Getting Started

This project uses [create-react-app](https://create-react-app.dev/) template

## Installing

### Manually

1. In order to run this project you need both [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/package/npm) (Node.js usually includes npm if not install it)
2. Install yarn using `npm install --global yarn` make sure you have **sufficient permissions**.
3. Enter project root directory and run `yarn install` to install dependencies of project
4. Run `yarn develop` to start project it will be available at [http://localhost:3000](http://localhost:3000)

### Using Docker

1. Enter project root directory
2. Build docker file using `docker build -t mmcm:latest .`
3. Run docker image using `docker run --rm --ti -p 3000:3000 mmcm:latest`
4. Project will be available at [http://localhost:3000](http://localhost:3000)
