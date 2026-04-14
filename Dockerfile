# build
FROM oven/bun:alpine AS build

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

# prod
FROM oven/bun:alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/games ./games
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

EXPOSE 4321

ENV HOST=0.0.0.0
ENV PORT=4321

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:4321/up || exit 1

CMD ["bun", "run", "dist/server/entry.mjs"]
