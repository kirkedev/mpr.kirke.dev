FROM node:lts-alpine3.17 AS dev
ENV NODE_ENV development
ENV MPR_HOST ${MPR_HOST}

WORKDIR /home/node/mpr
COPY package.json .yarnrc.yml yarn.lock tsconfig.json ./
COPY .yarn ./.yarn
COPY api/package.json ./api/package.json
COPY lib/package.json ./lib/package.json
RUN yarn workspace api install

ENTRYPOINT ["yarn", "workspace", "api"]
CMD ["nodemon"]

FROM node:lts-alpine3.17 AS build
WORKDIR /home/node/mpr
COPY --from=dev /home/node/mpr ./
COPY api ./api
COPY lib ./lib

RUN yarn workspace api esbuild index.ts --outfile=index.cjs --bundle --platform=node --minify --analyze

FROM node:lts-alpine3.14 AS api
WORKDIR /home/node/mpr
COPY --from=build /home/node/mpr/api/index.cjs ./

ENV NODE_ENV production
ENV MPR_HOST ${MPR_HOST}
USER node

CMD ["node", "index.cjs"]
