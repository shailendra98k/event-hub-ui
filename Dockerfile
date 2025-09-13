# Use the official Node.js 14 image as the base image
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if using npm) or yarn.lock (if using yarn) to the container
COPY package*.json ./

# Install the app's dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the container
COPY . .

# Build the React app for production
RUN npm run build


# Use a lightweight Node.js image as the final production image
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
