FROM node:18-alpine as builder

ADD . /app

WORKDIR /app/build

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:18.0.0-alpine as runner

COPY --from=builder /app/build /app/

WORKDIR /app

EXPOSE ${PORT}

CMD ["npm", "run","start:dev"]