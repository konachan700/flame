FROM node:16 as builder

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN mkdir -p ./public ./data \
    && cd ./client \
    && npm install --production \
    && npm run build \
    && cd .. \
    && mv ./client/build/* ./public \
    && rm -rf ./client

FROM node:16-alpine

COPY --from=builder /app /app

WORKDIR /app

EXPOSE 5005

ENV NODE_ENV=production
ENV PASSWORD=flame_password

RUN npm install -g sqlite3 && npm i -g sequelize && npm rebuild

CMD ["sh", "-c", "chown -R node /app/data && node server.js"]
