FROM node:20-slim

WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Pastikan next.js tersedia di PATH
ENV PATH="./node_modules/.bin:$PATH"

# Salin seluruh kode aplikasi
COPY . .

# Build aplikasi Next.js
RUN npm run build

# Ekspose port untuk aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]