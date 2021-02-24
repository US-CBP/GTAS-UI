FROM node:12.1.0 as build

RUN mkdir -p /usr/src/app
#npm 6.14.4

WORKDIR /usr/src/app
COPY . .

RUN mkdir /ui-cert /ui-key && npm install
#RUN npm i -S -g serve
RUN npm run build || cat /root/.npm/_logs/*

FROM nginx:1.19.5-perl

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY main.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY ./env.sh .

RUN chmod +x env.sh

COPY --from=build /usr/src/app/build/ /usr/share/nginx/html
RUN mkdir public
EXPOSE 80

RUN apt-get -y update && apt-get install -y wget
RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz
RUN tar -C /usr/local/bin -xzf dockerize-linux-amd64-v0.6.1.tar.gz

CMD ["/bin/bash", "-c", "./env.sh && dockerize -wait tcp://web-app:8443 -timeout 1000s && nginx -g \"daemon off;\""]