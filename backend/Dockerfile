# Use a lightweight Node.js image
FROM node:14-alpine

RUN mkdir /app

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install -g typescript

# Copy the rest of the application code
COPY . .

#run the build command
RUN npm run clean
RUN tsc
RUN cp package.json www/package.json
RUN mkdir www/tmp/ 
RUN cd www && zip -r Archive.zip . && cd ..

# Expose the application port
EXPOSE 8082

# Start the backend application
CMD ["npm", "dev"]
