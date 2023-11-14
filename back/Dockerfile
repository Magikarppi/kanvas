FROM node:latest

WORKDIR /app

EXPOSE 5000

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install --silent

COPY . ./

CMD ["npm", "run", "dev"]