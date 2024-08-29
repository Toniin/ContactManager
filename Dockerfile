# build environment
FROM node:20.15.1-slim AS build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm ci --silent
RUN npm install -g @angular/cli

# Copy the rest of the application code to the container
COPY . ./

# Build the React app
RUN npm run build

# production environment
FROM nginx:1.27.1-alpine3.20-slim

# Copy the ngnix.conf to the container nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the React app build files to the container nginx
COPY --from=build /app/dist/contact-manager/browser /usr/share/nginx/html

# Copy the script to update the environment variables
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
