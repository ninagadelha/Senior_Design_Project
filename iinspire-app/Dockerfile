FROM node:20

# Set working directory
WORKDIR /app

# Copy dependency info and install
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the entire app
COPY . .

# Set the production environment
ARG NODE_ENV=production
ENV NODE_ENV=production

# Set the API base URL at build time for Next.js to embed it into the app
ARG NEXT_PUBLIC_API_URL=https://api.mystemgrowth.com
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Copy env file as a backup (not used if we already set env above)
COPY .env.production .env

# Build the app
RUN npm run build

# Expose port and start app
EXPOSE 3000
CMD ["npx", "next", "start", "-p", "3000"]
