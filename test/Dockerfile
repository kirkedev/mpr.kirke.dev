FROM cypress/included:8.6.0 as tests

WORKDIR /home/node/mpr
COPY package.json .yarnrc.yml yarn.lock ./
COPY .yarn ./.yarn
COPY api/package.json ./api/
COPY app/package.json ./app/
COPY lib/package.json ./lib/
COPY test/package.json ./test/
RUN yarn install

COPY tsconfig.json tsconfig.options.json ./
COPY api ./api
COPY lib ./lib
COPY test ./test

ENTRYPOINT ["yarn", "workspace", "test"]
CMD ["all"]
