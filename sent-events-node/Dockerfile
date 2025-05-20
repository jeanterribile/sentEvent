# Usa un'immagine di Node.js ufficiale
FROM node:18

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file della tua applicazione
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Espone la porta per Server-Sent Events
EXPOSE 3000

# Avvia il server
CMD ["node", "server.js"]