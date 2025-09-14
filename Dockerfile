FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:20-slim

# # Set the working directory inside the container
WORKDIR /app
# RUN npm install next
# # Copy the necessary files from the build stage (previous FROM)
COPY --from=builder /app/.next/standalone ./standalone
COPY --from=builder /app/.next/static ./standalone/.next/static
COPY --from=builder /app/public ./standalone/public

# # Copy the build files from the build stage (previous FROM)
# COPY --from=builder /app/.next ./.next

# Install serve to run the production server
# RUN npm install -g serve
ENV PORT=80
ENV HOSTNAME='0.0.0.0'
# Expose the port on which your React app will run (typically 80 for HTTP)
EXPOSE 80
EXPOSE 443
EXPOSE 3000


CMD [ "node","./standalone/server.js" ]
