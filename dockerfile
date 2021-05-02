FROM node:12.1.0 as build

RUN mkdir -p /usr/src/app
#npm 6.14.4

WORKDIR /usr/src/app
COPY . .

RUN mkdir /ui-cert /ui-key && npm install
#RUN npm i -S -g serve
RUN npm rebuild node-sass
RUN npm run build

FROM nginx:1.19.5-perl
RUN apt-get -y update
RUN apt-get install -y dos2unix
RUN apt-get install -y wget
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY main.conf /etc/nginx/nginx.conf
RUN dos2unix /etc/nginx/conf.d/default.conf
RUN dos2unix /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY ./env.sh .
RUN dos2unix /usr/share/nginx/html/env.sh
RUN chmod +x env.sh

COPY --from=build /usr/src/app/build/ /usr/share/nginx/html
RUN mkdir public
EXPOSE 80

RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz
RUN tar -C /usr/local/bin -xzf dockerize-linux-amd64-v0.6.1.tar.gz

CMD ["/bin/bash", "-c", "./env.sh && dockerize -wait tcp://web-app:8443 -timeout 1000s && nginx -g \"daemon off;\""]