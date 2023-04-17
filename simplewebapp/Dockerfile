# Specify a base Image
# FROM alpine
# FROM node:6.14    # node:version
FROM node:alpine
WORKDIR /usr/app

# Our Container does not have package.json file 
COPY ./package.json ./

# Install some dependencies
RUN npm install

COPY ./ ./



# Default Command
CMD ["npm", "start"]
