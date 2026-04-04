# Use the official Bun image
FROM oven/bun:alpine

# Set working directory
WORKDIR /app

# Copy lockfile and package.json for caching
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Expose the default Astro port
EXPOSE 4321

# Start the Astro dev server
CMD ["bun", "run", "dev", "--", "--host"]
