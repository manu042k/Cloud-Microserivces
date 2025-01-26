# Use the Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available) and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Install TypeScript globally (if it's not in devDependencies)
RUN npm install -g typescript

# Compile TypeScript to JavaScript
RUN npm run build  

# Expose the application port
EXPOSE 3000

# Start the application using the compiled JavaScript
CMD ["npm", "run", "start"]
