FROM node:lts-alpine3.14 AS dev
ENV NODE_ENV development

WORKDIR /home/node/mpr
COPY package.json .yarnrc.yml yarn.lock tsconfig.json ./
COPY .yarn ./.yarn
COPY lib/package.json ./lib/package.json
COPY test/mpr/package.json ./test/mpr/package.json
RUN yarn workspace mpr install

COPY lib ./lib
COPY test/mpr ./test/mpr

ENTRYPOINT ["yarn", "workspace", "mpr"]
CMD ["start"]
