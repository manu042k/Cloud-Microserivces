# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage Docker cache)
COPY package*.json ./

# Install dependencies necessary for native modules
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

# Install Node dependencies
RUN npm install --legacy-peer-deps

# Copy all other application files
COPY . .

# Build the Angular application using Nx
RUN npx nx build profile

# Debug: Check if build output exists
RUN ls -la /app/dist/apps/profile

# Production Stage
FROM nginx:stable-alpine

# Set working directory for Nginx
WORKDIR /usr/share/nginx/html

# Remove default nginx contents
RUN rm -rf ./*

# Copy the built application from the builder stage
COPY --from=builder /app/dist/apps/profile ./

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Modify Nginx configuration to handle Angular's routing (if default config exists)
RUN test -f /etc/nginx/conf.d/default.conf && sed -i '10i \\ttry_files $uri $uri/ /index.html;' /etc/nginx/conf.d/default.conf || echo "Default Nginx config not found, skipping modification"

# Start Nginx in the foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]
