FROM node:12.16.2

# Create app directory
WORKDIR /usr/src/app

RUN npm install -g gatsby-cli && gatsby telemetry --disable

# Install app dependencies
COPY package.json .

RUN npm install --production
RUN echo "HEROKU_APP_NAME=$HEROKU_APP_NAME" > .env.production

COPY . .

# bundle app
RUN npm run build

EXPOSE 1337
CMD [ "npm", "start" ]