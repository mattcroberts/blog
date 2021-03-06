FROM node:8

RUN groupadd -g 999 nodejs && useradd -m -r -u 999 -g nodejs nodejs
RUN mkdir /home/nodejs/app
RUN chown -R nodejs:nodejs /home/nodejs
USER nodejs

WORKDIR /home/nodejs/app

COPY . .

RUN npm install --production

EXPOSE 3000

CMD [ "npm", "start" ]
