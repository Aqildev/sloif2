FROM node:lts
# FROM node:10.16.0-jessie
EXPOSE 3000
WORKDIR /data
RUN groupadd -r aqil755user && useradd -r -g aqil755user -G audio,video aqil755user \
    && mkdir -p /home/aqil755user/Downloads \
    && chown -R aqil755user:aqil755user /home/aqil755user \
    && chown -R aqil755user:aqil755user /data/

COPY --chown=aqil755user:aqil755user package.json ./package.json
RUN npm install --only=prod
# RUN npm install --production
# RUN npm install --force
COPY --chown=aqil755user:aqil755user dist ./

ENTRYPOINT ["/usr/local/bin/node", "--inspect=0.0.0.0:5858", "index.js"]