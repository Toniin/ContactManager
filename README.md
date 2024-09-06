# Contact manager (Angular)
Web app in Angular

Docker image of the project : <a href="https://hub.docker.com/r/toniin/contact-manager-angular" target="_blank">toniin/contact-manager-angular</a>

## Clone the application

```bash
git clone https://github.com/Toniin/ContactManager.git
```

## Put your environment variables (Environments/environment.ts)

- **API_URL**: Url/Ip adress of the backend API \
  Backend api suggestion: <a href="https://hub.docker.com/r/toniin/api-contact-manager" target="_blank">toniin/api-contact-manager</a>

## Install dependencies using npm

```bash
npm install
```

## Build and run the app using npm

```bash
npm run build
```
To run it, copy dist folder in server

Alternatively, you can run the app without build it using -

```bash
npm run start
```
The app will start running at <http://localhost:4200>.
