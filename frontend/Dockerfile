# -----------------------------------Build Stage-----------------------------------

#base image with name as builder
FROM node:18-alpine AS builder

# set working directory inside docker
WORKDIR /app

# copy the package json file to docker 
COPY package*.json ./

# install dependencies from package.json
RUN npm install

# copy the code from local to docker
COPY . .

# set environment variable to production
ENV VITE_BASE_URL=/api

# build the react app
RUN npm run build

# -----------------------------------Production Stage-----------------------------------
# base image with name as production
FROM nginx:alpine

# copy the build files from builder stage to nginx to serve it
COPY --from=builder /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
# this will run this container by default at 80 port
EXPOSE 80
#  Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]