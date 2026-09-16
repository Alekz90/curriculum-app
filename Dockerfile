# Stage 1: Build Angular app
FROM node:22-alpine AS build

RUN mkdir -p /app

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json /app

RUN npm install -g @angular/cli
RUN npm install

# Copy source code
COPY . /app

# Build Angular app for production
RUN npm run build --prod

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy built Angular files to Nginx html directory
COPY --from=build /app/dist/curriculum-app/browser /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

# Move to the project root directory
# cd C:/Projects/Curriculum/curriculum-app

# Create image command:
# docker build -t "web-resume-img:1.0.0" . --no-cache

# Ejecutar el contenedor
# docker run --name "web-resume-container" -p 80:80 "web-resume-img:1.0.0"

# Delete the container
# docker container rm -f "web-resume-container"

# Delete the image
# docker image rm "web-resume-img:1.0.0"