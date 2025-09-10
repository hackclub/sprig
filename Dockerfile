# Use Node.js 20 with Alpine as the base image
FROM node:20-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock before installing dependencies (for better caching)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Expose the default Astro port
EXPOSE 3000

# Default command to start the Astro app
CMD ["yarn", "dev", "--host"]
