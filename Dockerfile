FROM node:22-alpine AS base

FROM base AS pnpm
RUN npm install -g pnpm

FROM pnpm AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# FROM deps AS prod-deps
# WORKDIR /app
# COPY --from=deps /app .
# RUN pnpm prune --prod

FROM deps AS build
WORKDIR /app
COPY . .
RUN pnpm build

# FROM base AS release
# WORKDIR /app

# COPY --from=prod-deps /app .
# COPY --from=build /app/dist ./dist

# Define the command to start the application
CMD [ "node", "dist/main.js" ]