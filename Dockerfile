FROM node:alpine
WORKDIR /app
COPY . /app
RUN npm install && npm run build
CMD ["node","dist/index.js"]