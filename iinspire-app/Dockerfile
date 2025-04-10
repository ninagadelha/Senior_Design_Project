FROM node:20

# Set working directory
WORKDIR /app

# Optimize install by copying only the lock and manifest first
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the full app source into container
COPY . .

# Build the app (supports /src/app structure automatically)
RUN npm run build

# Expose Next.js port
EXPOSE 3000

# Start the Next.js server
CMD ["npx", "next", "start", "-p", "3000"]
