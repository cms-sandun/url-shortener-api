FROM node:18

WORKDIR /usr/src/app

COPY .env ./
COPY package*.json ./
COPY /prisma ./prisma/

RUN npm install

RUN npx prisma migrate dev --name initial-migration

COPY . .

EXPOSE 3000

CMD ["npm", "start"]