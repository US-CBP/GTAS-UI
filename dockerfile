FROM node:10.10.0 as build

RUN mkdir -p /usr/src/app
#npm 6.14.4

WORKDIR /usr/src/app
COPY . .

RUN mkdir /ui-cert /ui-key && npm install
#RUN npm i -S -g serve
RUN npm run build

FROM nginx:1.16.0-perl

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY main.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]