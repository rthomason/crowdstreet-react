FROM node:alpine

WORKDIR /app

# configure deps first
COPY ./package.json ./
RUN npm install

# then copy source code
COPY . .

RUN npm run build

FROM nginx
EXPOSE 80
COPY --from=0 /app/build /usr/share/nginx/html
