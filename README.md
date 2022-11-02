# Terrier CRM React frontend
## Build and run static pages
npm run next

docker run --name teriado -v /Users/louistorbay/IdeaProjects/terrier/terrier-crm/out:/usr/share/nginx/html:ro -p 3000:80 nginx

## Bulk resizing images using imagemagick
find . -iname '*.jp?eg' -exec convert {} -verbose -resize 3000x3000 -quality 45\> {} \;