# Use a Debian-based Node.js image (Bullseye or Slim)
FROM node:20-bullseye

# Install required dependencies (Debian-based)
RUN apt-get update && apt-get install -y \
    chromium \
    chromium-driver \
    ffmpeg \
    libglib2.0-0 \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libpango-1.0-0 \
    libcairo2 \
    libx11-6 \
    libxcomposite1 \
    libxrandr2 \
    libxcursor1 \
    libxi6 \
    libxtst6 \
    libxdamage1 \
    libxfixes3 \
    mesa-utils \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files first (to optimize Docker caching)
COPY package.json ./

# Install dependencies (including wrtc)
RUN npm install

# Copy the rest of the application files
COPY . .

# Default command
CMD ["npm", "start"]
