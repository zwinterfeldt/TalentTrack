FROM node:14

WORKDIR /my-app

COPY package.json package-lock.json ./
RUN npm install

ENV REACT_APP_BACKEND_URL=https://talenttrack-backend.onrender.com

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

ENV HOST=0.0.0.0

CMD ["serve", "-s", "build", "-l", "3000"]
