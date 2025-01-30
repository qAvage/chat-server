FROM node:23-alpine3.20

WORKDIR /

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["yarn", "start"]
