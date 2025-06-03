# -----------------------------------Build Stage-----------------------------------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# create a production build
RUN npm run build

# -----------------------------------Run Stage-----------------------------------
FROM node:18-alpine

WORKDIR /app

# Only copy built code + necessary files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 7000

# Start your backend
CMD ["node", "dist/server.js"]
