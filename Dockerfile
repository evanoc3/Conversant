FROM node:20-alpine as builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
CMD ["npm", "start"]
EXPOSE 3000
