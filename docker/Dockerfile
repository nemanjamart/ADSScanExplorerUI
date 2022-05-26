FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Copy files required for build
COPY . .

# Install app dependencies
RUN npm install

# Build app
RUN npm run build

# Expose port 3000
EXPOSE 3000
