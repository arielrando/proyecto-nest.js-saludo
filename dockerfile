FROM node:20

WORKDIR /app

COPY package*.json ./

# Instalamos todas las dependencias (dev incluidas)
RUN npm install

# Copiamos el resto del proyecto
COPY . .

# Exponemos el puerto
EXPOSE 3000

# Por defecto, levantamos en modo desarrollo (hot reload)
CMD ["npm", "run", "dev"]