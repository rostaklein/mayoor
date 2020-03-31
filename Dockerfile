FROM node:12.4.0
RUN openssl version -v
RUN uname -a

ARG database_url
ENV DATABASE_URL=$database_url

RUN echo $DATABASE_URL

COPY ./frontend /opt/frontend
WORKDIR /opt/frontend
RUN npm i \
    && npm run build

ADD ./backend /opt/app
WORKDIR /opt/app

USER root

RUN rm -rf node_modules \
    && npm install \
    && npm run build \
    && chown -R node /opt/app

USER node

ENV HOME_DIR=/opt/app \
    DEBUG=*

EXPOSE 8080

CMD ["npm", "run", "start:full"]