FROM node:21-alpine3.19

WORKDIR /app

# Salin file dependency terlebih dahulu (agar caching optimal)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Install next secara global (opsional, biasanya tidak perlu kalau di package.json sudah ada)
# RUN npm install -g next

# Salin semua file proyek ke dalam container
COPY . .

# Build proyek Next.js
RUN npm run build

# Jalankan server produksi
CMD ["npm", "run", "start"]
