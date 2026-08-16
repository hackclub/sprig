FROM oven/bun:debian AS build

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

FROM oven/bun:debian

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/index.js ./
COPY --from=build /app/y-webrtc.js ./
COPY --from=build /app/crypto.js ./

CMD ["bun", "run", "index.js"]
