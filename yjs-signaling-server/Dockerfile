FROM oven/bun:debian AS build

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

FROM oven/bun:debian

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/bin ./bin

ENV PORT 8080

CMD ["bun", "run", "bin/server.js"]
