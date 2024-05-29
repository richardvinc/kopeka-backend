FROM node:18

WORKDIR /app

COPY package*.json  yarn.lock ./

RUN yarn install --immutable

COPY . .

RUN yarn run build

CMD [ "yarn", "run", "start" ]