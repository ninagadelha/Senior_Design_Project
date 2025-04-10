# Use full Node image (not Alpine) to avoid some build issues with native packages
FROM node:20

# Create app directory
WORKDIR /app


ENV CI=true

# Copy only package files first (for caching layers)
COPY package*.json ./


# Clean install without peer issues
RUN npm install --legacy-peer-deps
COPY . .

# Build Next.js app
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
