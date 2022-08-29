FROM node:16

WORKDIR /app

COPY . .

EXPOSE 5000

RUN npm i && npm run build
RUN npm run migration:run

CMD ["npm", "start"]

