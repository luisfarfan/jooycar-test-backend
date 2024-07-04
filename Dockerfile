# Use the official Node.js image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Set environment variables
ARG NODE_ENV
ARG PORT
ARG HOST
ARG JOOYCAR_API_URL
ARG MONGODB_URI

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV HOST=$HOST
ENV JOOYCAR_API_URL=$JOOYCAR_API_URL
ENV MONGODB_URI=$MONGODB_URI

# Command to run the application
CMD ["npm", "run", "dev"]