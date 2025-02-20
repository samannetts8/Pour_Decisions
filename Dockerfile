FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tailwind*.config.js ./
COPY postcss*.config.js ./
COPY vite*.config.ts ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

EXPOSE 5175

CMD ["npm","run","dev"]