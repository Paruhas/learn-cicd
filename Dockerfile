# Use an official Node.js runtime as a parent image
FROM node:22-alpine AS base

FROM base AS pnpm
RUN npm install -g pnpm

FROM pnpm AS deps
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json (or yarn.lock) before other files
# Leverage Docker cache to save time on dependency installation
COPY package.json ./
COPY pnpm-lock.yaml ./
# Install dependencies
RUN pnpm install --frozen-lockfile

# FROM deps AS prod-deps
# WORKDIR /app
# COPY --from=deps /app .
# RUN pnpm prune --prod

FROM deps AS build
WORKDIR /app
# Copy the rest of your application code to the container
COPY . .
# Build the NestJS application
RUN pnpm build

# FROM base AS release
# WORKDIR /app

# COPY --from=prod-deps /app .
COPY --from=build /app/dist ./dist

# Expose the port that your NestJS app runs on
EXPOSE 3000

# Define the command to start the application
CMD [ "node", "dist/main.js" ]