from node:alpine

WORKDIR /app
COPY . /app
RUN yarn install
RUN yarn build
RUN rm /app/src/config.ts

WORKDIR /app/build
CMD ["node", "app.js"]