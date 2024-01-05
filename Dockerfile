# # Use a lightweight Node.js image
# FROM node:14-alpine

# RUN mkdir /app

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Expose the application port
# EXPOSE 8082

# # Start the backend application
# CMD ["npm", "dev"]



# # Use a lightweight Node.js image
# FROM node:14-alpine

# RUN mkdir /app

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the frontend application
# RUN npm run build

# # Expose the application port
# EXPOSE 8080

# # Start the application
# CMD ["node", "index.js"]




# Stage 1: Build Frontend
FROM node:14-alpine as frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN node index.js

# Stage 2: Build Backend
FROM node:14-alpine as backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
RUN npm run dev

# Stage 3: Final Image
FROM alpine:latest
WORKDIR /app
COPY --from=frontend-builder /app/frontend/build /app/frontend
COPY --from=backend-builder /app/backend /app/backend

# Set up any additional configuration or dependencies needed for the final image

# Expose ports and define the startup command
EXPOSE 8080 8082
CMD ["node", "index.js"]
