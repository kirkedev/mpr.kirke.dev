MPR Dashboard
-------------

### About
This repository hosts the code for a [dashboard of daily hog and pork prices](https://mpr.kirke.dev) based on historical 
[Mandatory Price Reporting](https://mpr.datamart.ams.usda.gov/) data hosted by the USDA's [Agricultural Marketing Service](https://www.ams.usda.gov/).

[Lean hog futures](https://www.cmegroup.com/markets/agriculture/livestock/lean-hogs.html) traders normally retrieve 
these reports as PDFs, like this [afternoon cutout report](https://www.ams.usda.gov/mnreports/ams_2498.pdf).
While these reports are great, it's not really possible to see price trends over time, and seasonality is a huge component of agriculture prices. 
I know traders who write them down in a legal pad, and others who are a little more technical that manually maintain an Excel spreadsheet. 
Fortunately for everyone the USDA hosts an API with historical data.

Aside from being useful to myself and like two other people as a personal project, this repository also serves as a portfolio project for what I 
believe to be best practices in web development. It's a containerized typescript monorepo with clean architecture, thorough testing, and CI/CD.

### Project Setup
The only system dependencies are [node.js](https://nodejs.org/en/download/current) with [yarn](https://yarnpkg.com/getting-started/install) and [docker with docker-compose](https://docs.docker.com/desktop/)

```bash
git clone git@github.com:kirkedev/mpr.kirke.dev.git
yarn install
yarn prepare
```

### Commands
Start the app in dev mode. The app will be hosted at `http://localhost:3000` and a debugger is available on port `9229`
```bash
yarn dev   
```

Start the app in production mode. The app will be hosted at `http://localhost`
```bash
yarn start
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

| Command                       | Description                                  |
|-------------------------------|----------------------------------------------|
| `yarn workspace test unit`    | Run unit and integration tests               |
| `yarn workspace test watch`   | Run unit and integration tests in watch mode |
| `yarn workspace test e2e`     | Run end-to-end acceptance tests              |
| `yarn workspace test smoke`   | Run smoke tests                              |  

### CI/CD Workflows
Add git hooks with `yarn prepare`
* [Lint](./.githooks/pre-commit) runs before committing
* [Unit and Integration Tests](./.githooks/pre-push) run before pushing to GitHub

GitHub Actions
* [Lint, Unit, Integration, and Acceptance Tests](.github/workflows/merge.yaml) run as a pull request check
* [Smoke Tests](.github/workflows/smoke.yaml) run when merging to main so that main is always production ready
* [Deploy](.github/workflows/deploy.yaml) runs when a new version tag is created. The docker images are built, smoke tested, pushed to Amazon ECR, and deployed to production
