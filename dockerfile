FROM nginx:1.19.5-perl

RUN mkdir -p /usr/share/nginx/html/public /usr/src/app/ui-cert /usr/src/app/ui-key

WORKDIR /usr/src/app

COPY . .

RUN apt-get -y update \
    && apt-get install -y wget \
    && curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh -o install_nvm.sh \
    && bash install_nvm.sh && export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
    && [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" \
    && nvm install --lts \
    && npm install \
    && mv nginx.conf /etc/nginx/conf.d/default.conf \
    && mv main.conf /etc/nginx/nginx.conf && ls /usr/src/app/

ENV NODE_PATH /root/.nvm/versions/node/v14.18.0/lib/node_modules
ENV PATH /root/.nvm/versions/node/v14.18.0/bin:$PATH

WORKDIR /usr/share/nginx/html

RUN cp /usr/src/app/env.sh . \
    && chmod +x env.sh

EXPOSE 80

RUN wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz
RUN tar -C /usr/local/bin -xzf dockerize-linux-amd64-v0.6.1.tar.gz

CMD ["/bin/bash", "-c", " \
    cd /usr/src/app && /root/.nvm/versions/node/v14.18.0/bin/npm run build && cd /usr/share/nginx/html \
    && cp -a /usr/src/app/build/. /usr/share/nginx/html \
    && ./env.sh && dockerize -wait tcp://web-app:8443 -timeout 1000s \
    && nginx -g \"daemon off;\""]