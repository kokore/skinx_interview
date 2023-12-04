# Fetching the minified node image on apline linux
FROM node:18-alpine

# Setting up the work directory
WORKDIR /express-docker

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install
RUN npx prisma generate
RUN npx prisma migrate dev
RUN npx ts-node prisma/seed.ts

# Starting our application
CMD [ "npm", "start" ]

# Exposing server port
EXPOSE 3000