FROM node:latest

EXPOSE 3000/tcp

WORKDIR /mcmt

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "develop"]
