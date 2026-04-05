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
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

EXPOSE 4321

ENV HOST=0.0.0.0
ENV PORT=4321

CMD ["bun", "run", "dist/server/entry.mjs"]
