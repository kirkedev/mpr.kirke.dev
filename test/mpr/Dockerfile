FROM node:lts-alpine3.17 AS dev
ENV NODE_ENV development
ENV VITE_DATE 2021-12-23

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
