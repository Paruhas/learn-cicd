# Non Multi-stage builds
FROM node:22-alpine

RUN npm install -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

EXPOSE 3000

CMD [ "node", "dist/main.js" ]