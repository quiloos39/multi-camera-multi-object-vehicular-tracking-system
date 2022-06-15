FROM node:latest

EXPOSE 3000/tcp

WORKDIR /app

COPY . .

RUN yarn install

CMD yarn develop
