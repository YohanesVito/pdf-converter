FROM node:21-alpine3.19

WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

RUN npm install -g next

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY jsconfig.json .
COPY postcss.config.mjs .

RUN npm run build

CMD ["npm", "run", "start"]