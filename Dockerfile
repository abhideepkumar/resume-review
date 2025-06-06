#write dockerfile of a nodejs application using alpine linux
FROM node:alpine
# Set the working directory to /app
WORKDIR /app
# Copy the current directory contents into the container at /app
COPY . /app
# Install any needed packages specified in package.json
RUN npm install
# Make port 8000 available to the world outside this container
EXPOSE 8000
# Run the app when the container launches
CMD ["npm", "start"]