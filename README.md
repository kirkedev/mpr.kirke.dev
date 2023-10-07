MPR Dashboard
-------------

### About
This repository hosts the code for a [dashboard of daily hog and pork prices](https://mpr.kirke.dev) based on historical 
[Mandatory Price Reporting](https://mpr.datamart.ams.usda.gov/) data hosted by the USDA's [Agricultural Marketing Service](https://www.ams.usda.gov/).

[Lean hog futures](https://www.cmegroup.com/markets/agriculture/livestock/lean-hogs.html) traders normally retrieve 
these reports as PDFs, like [this afternoon cutout report](https://www.ams.usda.gov/mnreports/ams_2498.pdf).
While these reports are great, it's not really possible to see price trends over time, and seasonality is a huge component of agriculture prices. 
I know traders who write them down in a legal pad, and others who are a little more technical that manually maintain an Excel spreadsheet. 
Fortunately for everyone the USDA hosts an API with historical data.

While being useful to myself and others I know as a personal project, this repository is also a reference project 
showcasing what I believe to be best practices in web development.
It's a dockerized typescript monorepo with clean architecture, thorough testing, and CI/CD.

### Project Setup
The only system dependencies are [node.js](https://nodejs.org/en/download/current) with [yarn](https://yarnpkg.com/getting-started/install) and [docker with docker-compose](https://docs.docker.com/desktop/).

```bash
git clone git@github.com:kirkedev/mpr-dashboard.git
yarn install
yarn prepare
```

### Commands
Start the app in dev mode. The app will be hosted at http://localhost:3000 and a debugger is available on port `9229`
```bash
yarn dev   
```

Start the app in production mode. The app will be hosted at http://localhost
```bash
yarn build && yarn start
```

Shut down the app
```bash
yarn stop
```

Fix lint errors
```bash
yarn fix
```

### Testing
Tests reside in the [test workspace](test).

Run unit and integration tests. Does not require app to be running 
```bash
yarn workspace test all
```
Run end-to-end acceptance tests. App must be running in dev mode
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

Run smoke tests. App must be running locally in production mode
```bash
yarn workspace test smoke
```

### CI/CD Workflows
Add git hooks with `yarn prepare`
* [Lint](./.githooks/pre-commit) runs before committing
* [Unit and Integration Tests](./.githooks/pre-push) run before pushing to GitHub

GitHub Actions
* [Unit and Integration Tests](.github/workflows/test.yaml) run as a pull request check
* [Acceptance Tests](.github/workflows/acceptance.yaml) also run as a pull request check
* [Smoke Tests](.github/workflows/smoke.yaml) run when merging to main so that main is always production ready
* [Deploy](.github/workflows/deploy.yaml) runs when a new version tag is created. The docker images are built, smoke tested, pushed to Amazon ECR, and deployed to production
