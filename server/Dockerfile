# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy source code
COPY . .

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install --only=production
RUN npx prisma generate

# Copy built assets and source from builder
COPY --from=builder /app/src ./src

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
