FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --production --legacy-peer-deps
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
ENV PORT=80
ENV HOSTNAME='0.0.0.0'
# Expose the port on which your React app will run (typically 80 for HTTP)
EXPOSE 80
EXPOSE 443
CMD ["npm", "run", "start"]