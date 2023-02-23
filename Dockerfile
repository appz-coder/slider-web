FROM node:14.21.3
LABEL version="1.0"
LABEL description="This is the docker image for the slider frontend project"
LABEL maintainer = ["skydev55@outlook.com"]
RUN mkdir /usr/src/app
RUN mkdir /usr/src/app/frontend
WORKDIR /usr/src/app/frontend
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .