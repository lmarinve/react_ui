# pull official base image
FROM node:15.2.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# set environment variables
ARG REACT_APP_USERS_SERVICE_URL
ENV REACT_APP_USERS_SERVICE_URL $REACT_APP_USERS_SERVICE_URL
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# install and cache app dependencies
COPY ./services/react_ui/package*.json ./
COPY ./services/react_ui/webpack.config.js ./
RUN npm install
RUN npm install --save react-router
RUN npm install webpack webpack-dev-server webpack-cli --save-dev
RUN npm install @babel/plugin-proposal-class-properties --save-dev
RUN npm install @babel/core @babel/preset-env
RUN npm install @babel/plugin-syntax-jsx --save-dev
RUN npm install @babel/preset-react

# copy app
COPY ./services/react_ui/src/ .
#RUN rm .eslintrc.json
RUN npm run build

# start app
#CMD ["npm", "start"]
