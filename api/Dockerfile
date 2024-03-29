FROM node:lts-alpine3.19 AS dev
ENV NODE_ENV development
ENV MPR_HOST ${MPR_HOST}

WORKDIR /home/node/mpr
COPY package.json .yarnrc.yml yarn.lock tsconfig.json ./
COPY .yarn ./.yarn
COPY api/package.json ./api/package.json
COPY lib/package.json ./lib/package.json
RUN yarn workspace api install

ENTRYPOINT ["yarn", "workspace", "api"]
CMD ["dev"]

FROM node:lts-alpine3.19 AS build
ENV NODE_ENV production

WORKDIR /home/node/mpr
COPY --from=dev /home/node/mpr ./
COPY api ./api
COPY lib ./lib

RUN yarn workspace api esbuild index.ts --outfile=index.cjs --bundle --platform=node --minify --analyze

FROM node:lts-alpine3.19 AS api
ENV NODE_ENV production
ENV MPR_HOST ${MPR_HOST}

WORKDIR /home/node/mpr
COPY --from=build /home/node/mpr/api/index.cjs ./

USER node
CMD ["node", "index.cjs"]
