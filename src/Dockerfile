FROM node:16-alpine

ENV PORT 3000

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci && mkdir -p /assets/imgs && npm run build

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]