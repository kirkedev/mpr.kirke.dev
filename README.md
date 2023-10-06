MPR Dashboard
--------------

### About
This repository hosts the code for a dashboard of time series charts for lean hog prices
from [Mandatory Price Reporting](https://mpr.datamart.ams.usda.gov/) hosted by the USDA's [Agricultural Marketing Service](https://www.ams.usda.gov/).

Lean hog futures traders normally retrieve these reports as PDFs, like [this afternoon cutout report](https://www.ams.usda.gov/mnreports/ams_2498.pdf) for example.
While these reports are great, it makes it really difficult to view price trends over time. Fortunately the USDA also serves an API with historical data.

While also being useful to myself as a personal project, this repository is also a reference project showcasing what I believe to be best practices in web development.
It's a dockerized typescript monorepo with lots of tests and CI/CD.

### Project Setup

The only system dependencies are [node.js](https://nodejs.org/en/download/current) with [yarn](https://yarnpkg.com/getting-started/install) and [docker with docker-compose](https://docs.docker.com/desktop/).

```bash
    git clone git@github.com:kirkedev/mpr-dashboard.git
    yarn install
    yarn prepare
```
### Commands

Start the app in dev mode. The app will be hosted at https://localhost:3000 and a debugger is available on port `9229`.
```bash
    yarn dev     
```

Start the app in production mode. You will need to be connected to a docker swarm with `docker swarm init`. 
The app will be hosted at https://localhost. Run `yarn stop` to shut it down.
```bash
    yarn build && yarn start 
```

### Testing
Tests reside in the [test workspace](test/). 

Run unit tests
```bash
yarn workspace test unit
```

Run integration tests
```bash
yarn workspace test integration
```

Run unit and integration tests. Does not require app to be running. 
```bash
yarn workspace test all
```

Run end-to-end acceptance tests. App must be running in dev mode.
```bash
yarn workspace test e2e
```

Run unit and integration tests in watch mode 
```bash
yarn workspace test watch
```

Open cypress for end-to-end and component tests 
```bash
yarn workspace test cypress
```
### Workflows
Add githooks with `yarn prepare`. 
This will run lint on your code before committing and run unit and integration tests before pushing to GitHub.

* [Unit / Integration Tests](.github/workflows/test.yaml) run as a pull request check.
* [Acceptance Tests](.github/workflows/acceptance.yaml) also run as a pull request check.
* [Deploy](.github/workflows/deploy.yaml) runs when a new version tag is created. The docker images are built, pushed to ECR, smoke tested, and deployed to production.
