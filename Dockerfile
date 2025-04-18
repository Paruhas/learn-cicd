#Dockerfile
FROM public.ecr.aws/lambda/nodejs:22 AS base

FROM base AS pnpm
RUN npm install -g pnpm

FROM pnpm AS dependencies
RUN mkdir -p /app
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile

FROM dependencies AS build
WORKDIR /app
COPY . .
RUN pnpm build

FROM base AS deploy
WORKDIR /app
ARG BUILD_ENV=production
RUN echo '==== BUILD ' ${BUILD_ENV} ' ENV ===='
ENV NODE_ENV=${BUILD_ENV}

COPY --from=build /app/dist ${LAMBDA_TASK_ROOT}/dist
COPY --from=build /app/node_modules ${LAMBDA_TASK_ROOT}/node_modules

CMD ["dist/lambda.handler" ]

