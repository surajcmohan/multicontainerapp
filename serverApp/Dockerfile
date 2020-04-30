FROM node
WORKDIR '/app'
COPY ./package-lock.json ./
RUN npm install
COPY . .
CMD ["node","server.js"]