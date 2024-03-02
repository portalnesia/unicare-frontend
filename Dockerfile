# Install all package depedencies to build production files
FROM node:18-alpine AS deps
LABEL stage=builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm config set legacy-peer-deps=true
RUN npm ci
RUN npm run patch

# Install production only depedencies
FROM node:18-alpine AS productiondeps
LABEL stage=builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm config set legacy-peer-deps=true
RUN npm ci --omit=dev


# Build nextjs production files
FROM node:18-alpine AS builder
LABEL stage=builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run patch
RUN npm run docker


# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN addgroup --system --gid 1002 heliostour
RUN adduser --system --uid 1002 heliostour

# Copy production depedencies
COPY --from=productiondeps /app/node_modules ./node_modules
# Copy public files
COPY --from=builder /app/public ./public
# Copy package.json
COPY --from=builder /app/package.json ./package.json
# Copy build files
COPY --from=builder --chown=heliostour:heliostour /app/.next/standalone ./
# Copy and rewrite build files
COPY --from=builder --chown=heliostour:heliostour /app/.next/static ./.next/static
# Copy nextjs env files
COPY --from=builder /app/.env.production.local ./

USER heliostour

ENV PORT 80

CMD ["node", "server.js"]
