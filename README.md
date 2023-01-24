# Zivero

This is the official Mono repo for the Zivero Ecommerce Engine
Zivero is an e-commerce project built using a monorepo structure, with a backend powered by Python, Django, and GraphQL API, and utilizing MongoDB and PostgreSQL as its databases. The frontend consists of a Vue3 app called "admin" and a Vue2 + Vuetify app called "store-front".

## What's inside?

This mono repo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager.
and uses turborepo for monorepo mangement .

It includes the following packages/apps:

### Prerequisites

- Python 3.x
- Node.js and yarn v18.3.0
- MongoDB v6 and PostgreSQL

### Apps and Packages

- `backend`: a Django app
- `store_front`: a [Vue2 ](https://vuejs.org) app
- `admin` : a Vue3 and vite app
- `graphql-client`: graphql sdl and documents to interact with the backend
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)

### Installation

- Clone the repository: `git clone https://github.com/aabidsofi19/zivero.git`
- Install the Python dependencies: `poetry install `
- Install the Node.js dependencies: `yarn install` from the workspace root
- Create a `.env` file in the root directory and set the necessary environment variables for your database and other configurations.
- Run the migrations: `poetry run python manage.py migrate`

### Development Server

- Start the mongodb server with `mongod`
- Start the development servers: `yarn dev`

### Utilities

This turborepo has some additional tools already setup for you:

- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
- [Pylint](https:pylint.org) for python code linting
- [black](https://pypi.org/project/black/) for python codel formating
- [mypy](http://mypy-lang.org/) fro static type checking

### User Ids

| Username  | Password        | Email             |
| --------- | --------------- | ----------------- |
| customer  | bestusername!!1 | customer@mail.com |
| superuser | test123         | super@gmail.com   |

## License

This project is licensed under the GPL License - see the LICENSE file for details.
