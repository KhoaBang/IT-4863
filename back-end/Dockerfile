FROM node:lts-alpine3.21

# Create and set the working directory
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN apk add --no-cache curl bash && \
    curl -o /usr/local/bin/wait-for-it https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it

# Install npm dependencies
USER node
RUN npm install

# Copy application files into the container
COPY --chown=node:node . .

# Copy the .env file into the container
# Ensure .env is copied to /home/node/app/.env
COPY .env /home/node/app/.env

# Install npm dependencies

# Switch to the node user
USER node

# Expose the required port
EXPOSE 9999

# Wait for Elasticsearch to be ready, then start the backend
# Replace "elasticsearch" with the service name in Docker Compose, e.g., "elastic"
CMD ["wait-for-it", "elastic:9200", "--", "npm", "start"]

