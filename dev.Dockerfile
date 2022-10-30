FROM arm64v8/nginx:1.22.0

ENV DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -y nginx-module-image-filter && rm -rf /var/lib/apt/lists/*
RUN mkdir -p /etc/nginx/logs

COPY nginx.conf /etc/nginx/nginx.conf
COPY out /var/www/public_html/

EXPOSE 80