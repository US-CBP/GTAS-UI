FROM node:12.1.0

RUN mkdir -p /usr/src/app
#npm 6.14.4

WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm i -S -g serve
RUN npm run build

EXPOSE 3000
# CMD [ "npm", "run", "start" ]
CMD serve -s build -l 3000