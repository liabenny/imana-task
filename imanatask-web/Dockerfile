FROM node:15.2.0
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
CMD ["ng", "serve"]