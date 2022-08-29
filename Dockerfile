FROM node:16

WORKDIR /app

COPY . .

EXPOSE 5000

RUN npm install --force
RUN npx prisma generate
RUN npm run build

CMD ["npm", "start"]

