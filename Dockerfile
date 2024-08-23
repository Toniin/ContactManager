### STAGE 1: ###
FROM node:alpine3.20 as build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4200
CMD ["npm", "start"]

### STAGE 2: ###
# FROM nginx:1.27.1-alpine3.20-slim
# COPY --from=build /usr/src/app/dist/contact-manager /usr/share/nginx/html
# EXPOSE 80
