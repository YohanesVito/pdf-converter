FROM node:20-slim

WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g next
# Pastikan next.js tersedia di PATH
ENV PATH="./node_modules/.bin:$PATH"

# Salin seluruh kode aplikasi
COPY . .

# Ekspose port untuk aplikasi
EXPOSE 3000

# Jalankan aplikasi dalam mode development
CMD ["npm", "run", "dev"]