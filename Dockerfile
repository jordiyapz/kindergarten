FROM node:14-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 3000, 9000

CMD ["npm", "run", "dev"]