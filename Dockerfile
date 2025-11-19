# Development Dockerfile for React Native / Nativewind project
# - Uses Node (with Corepack) to enable pnpm
# - Copies package manifest first to leverage Docker layer caching
# - Installs dependencies with pnpm, copies source, and exposes typical dev ports

FROM node:20-bullseye

# Create app directory
WORKDIR /usr/src/app

# Enable Corepack and pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 1. Copy package manifests and config files needed for dependency install
# This ensures metro.config.js and babel.config.js are present if needed for pre/post-install scripts.
# We also copy the source files here to ensure they are available for the NativeWind/Tailwind setup
COPY package.json pnpm-lock.yaml* metro.config.js tailwind.config.js babel.config.js ./ 

# Install dependencies
# We use --no-frozen-lockfile here, which is generally acceptable for dev.
RUN pnpm install --no-frozen-lockfile --unsafe-perm

# 2. Copy the rest of the app source code
# We copy all the rest of the source code now (including App.tsx and global.css)
COPY . .

# EXPO FIX: Clear the Expo/Metro cache inside the container on startup.
# This ensures that the environment uses the freshly installed dependencies and config.
# We will modify the CMD to run this before the actual start.
# EXPOSE 8081 19000 19001 # Keeping this as a comment, exposing in compose is better

# Default command — runs Metro/Expo
# 3. Modify CMD: Clear cache and then start.
CMD ["/bin/bash", "-c", "npx expo start --clear --no-dev --web"]
# Note: Using 'npx expo' instead of 'pnpm start' (which is 'expo start') is safer in Docker
# and explicitly clearing the cache (`--clear`) is often necessary to pick up new configs.
# I'm also adding --no-dev to prevent the internal dev tools from running, which can sometimes
# cause issues in headless Docker environments. You can remove it if you need the dev UI.