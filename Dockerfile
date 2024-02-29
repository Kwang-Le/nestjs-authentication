# Base image
FROM node:18-alpine

# set user to reduce security risk
USER node

#set enviroment to production to reduce size as some libraries are optimized for production enviroment
# ENV NODE_ENV production

# Create app directory
WORKDIR /usr/src/app



# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node:node package*.json ./



# Install app dependencies
RUN npm ci



# Bundle app source
COPY --chown=node:node . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
