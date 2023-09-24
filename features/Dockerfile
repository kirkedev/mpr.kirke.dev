FROM cypress/included:13.2.0

WORKDIR /home/node/mpr
COPY package.json .yarnrc.yml yarn.lock ./
COPY .yarn ./.yarn
COPY features/package.json ./features/
RUN yarn workspace features install

COPY features ./features

ENTRYPOINT ["yarn", "workspace", "features"]
CMD ["test"]
