FROM node:22-alpine

WORKDIR /app

# Salin file dependency terlebih dahulu (agar caching optimal)
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file proyek ke dalam container
COPY . .

# Build proyek Next.js
# RUN npm run build

# Jalankan server produksi
CMD ["npm", "run", "dev"]
