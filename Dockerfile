### STAGE 1: ###
FROM node:alpine3.20 AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm install -g @angular/cli
RUN npm run build
#EXPOSE 4200
#CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]

## STAGE 2: ###
 FROM nginx:1.27.1-alpine3.20-slim
 COPY --from=build /usr/src/app/dist/contact-manager/browser /usr/share/nginx/html
 EXPOSE 80
