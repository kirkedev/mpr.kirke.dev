FROM node:lts-alpine3.14 as dev
ENV NODE_ENV development
ENV API_PORT ${API_PORT}
ENV MPR_HOST ${MPR_HOST}

WORKDIR /home/node/mpr
COPY package.json .yarnrc.yml yarn.lock ./
COPY .yarn ./.yarn
COPY api/package.json ./api/package.json
COPY lib/package.json ./lib/package.json
RUN yarn workspace @ams/api install

EXPOSE 9929
EXPOSE ${API_PORT}

ENTRYPOINT ["yarn", "workspace", "@ams/api"]
CMD ["dev"]

FROM node:lts-alpine3.14 as build
WORKDIR /home/node/mpr
COPY --from=dev /home/node/mpr ./

COPY tsconfig.json tsconfig.options.json ./
COPY api ./api
COPY lib ./lib

RUN yarn workspace @ams/api build

FROM node:lts-alpine3.14 as run
WORKDIR /home/node/mpr
COPY --from=build /home/node/mpr/build ./
COPY --from=build /home/node/mpr/node_modules ./node_modules

COPY package.json ./
COPY api/package.json ./api/package.json
COPY lib/package.json ./lib/package.json

ENV NODE_ENV production
ENV API_PORT ${API_PORT}
ENV MPR_HOST ${MPR_HOST}
USER node

EXPOSE ${API_PORT}

ENTRYPOINT ["yarn", "workspace", "@ams/api"]
CMD ["start"]
