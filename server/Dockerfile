# Use Node.js
FROM node

WORKDIR /server

COPY package.json ./
COPY package-lock.json ./

RUN npm install
COPY . .

# Expose the port your server uses
EXPOSE 5005

# Run the server
CMD ["npm", "start"]