# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy production env file
COPY .env.production .env

# Set production environment variable
ENV NODE_ENV=production

# Expose the port
EXPOSE 5000

# Start the app
CMD ["node", "app.js"]