FROM node:20-alpine AS alpine
RUN apk update
RUN apk add --no-cache libc6-compat
RUN corepack enable

FROM alpine AS base
RUN yarn global add turbo@2.0.3 pnpm
RUN pnpm config set store-dir ~/.pnpm-store

FROM base AS pruner
ARG PROJECT
WORKDIR /app
COPY . .
RUN turbo prune --scope=${PROJECT} --docker

FROM base AS builder
ARG PROJECT
WORKDIR /app
COPY --from=pruner /app/out/pnpm-lock.yaml .pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml .pnpm-workspace.yaml
COPY --from=pruner /app/out/json .
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full .
RUN turbo run build --filter=${PROJECT}
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm prune --prod --no-optional

FROM alpine AS runner
ARG PROJECT
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

# TODO: optimize container size
COPY --from=builder --chown=nodejs:nodejs /app .
WORKDIR /app/services/${PROJECT}

ARG PORT
ENV PORT=${PORT}
ENV NODE_ENV=production
EXPOSE ${PORT}

CMD ["pnpm", "start:prod"]