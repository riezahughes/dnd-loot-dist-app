FROM node:13.7.0-stretch-slim

WORKDIR /usr/src/app

COPY ./ ./

RUN apt-get update && apt-get --yes upgrade && apt-get install --yes openssl

RUN npm install

RUN npx prisma migrate up --experimental

RUN npx prisma generate

ENTRYPOINT ["npm", "start"]