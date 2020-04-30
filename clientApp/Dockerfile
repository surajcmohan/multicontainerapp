FROM agileek/ionic-framework
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
CMD ["ionic","serve"]