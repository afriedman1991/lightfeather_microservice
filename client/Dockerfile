FROM node:14.16.0-alpine

WORKDIR /client/src/App.js

ENV PATH ./node_modules/.bin:$PATH

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install

COPY . ./

CMD ["npm", "start"]   