FROM node:lts-alpine3.14 AS dev
ENV NODE_ENV development
ENV API_URL ${API_URL}

WORKDIR /home/node/mpr
COPY package.json .yarnrc.yml yarn.lock tsconfig.json ./
COPY .yarn ./.yarn
COPY app/package.json ./app/
COPY lib/package.json ./lib/
RUN yarn workspace app install

ENTRYPOINT ["yarn", "workspace", "app"]
CMD ["dev"]

FROM node:lts-alpine3.14 AS build
WORKDIR /home/node/mpr
COPY --from=dev /home/node/mpr ./

COPY app ./app
COPY lib ./lib
RUN yarn workspace app vite build

FROM nginx:stable-alpine AS router
COPY --from=build /home/node/mpr/app/build /srv/app
COPY app/nginx.conf /etc/nginx/templates/default.conf.template

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
