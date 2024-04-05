FROM node:16-alpine

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
CMD npx next start
EXPOSE 3000

