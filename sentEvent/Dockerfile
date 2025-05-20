# Usa un'immagine di Nginx per servire l'app
FROM node:18 AS build

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file della tua applicazione
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=build /app/dist/sent-event/browser /usr/share/nginx/html

# Espone la porta per client
EXPOSE 80

# Avvia il nginx
CMD ["nginx", "-g", "daemon off;"]