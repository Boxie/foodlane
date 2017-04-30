FROM node:7.9.0

# Create app directory
RUN mkdir -p /opt/app

# Bundle app source
COPY . /opt/app

WORKDIR /opt/app

RUN npm install --global mocha

EXPOSE 3000
CMD [ "npm", "start" ]