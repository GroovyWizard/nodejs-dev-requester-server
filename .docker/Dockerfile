FROM node:alpine

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
RUN apk --no-cache add curl

USER root
RUN npm install -g cross-env

#tentativa frustrada de resolver problema de Error: spawn ENOENT
#RUN npm install nodemon

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

USER node
RUN npm cache clean --force --loglevel=error && npm install --verbose

# COPY --chown=node:node app.js .
# COPY --chown=node:node mysql.js .
# COPY --chown=node:node server.js .
# COPY --chown=node:node routes ./routes
# COPY --chown=node:node ./urlcheck.sh .

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]

