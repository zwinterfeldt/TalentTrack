FROM node:14

WORKDIR /my-app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

ENV HOST=0.0.0.0

CMD ["serve", "-s", "build", "-l", "3000"]
