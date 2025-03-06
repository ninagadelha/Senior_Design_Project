# Build Next.js app
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ENV NEXT_DISABLE_ESLINT_PLUGIN=true
RUN npm run build


#Run it
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
RUN npm install --only=production
EXPOSE 3000
CMD ["npm", "start"]
