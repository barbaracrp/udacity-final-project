# Travel Information App Project

## Overview

This is the Capstone project for my Udacity Front-end Nanodegree course.

## Instructions

### Project configuration

In order to run this project, you'll need to create a `.env` file at the root directory of the project, containing the follwing environment variables:

#### API domains for `.env` file

> Below should be included as is in your `.env` file

```text
WEATHERBIT_URL=api.weatherbit.io
PIXABAY_URL=pixabay.com
GEONAMES_URL=api.geonames.org
```

#### API keys for `.env` file

> Fill the variable values' with your own API keys (WeatherBit, Pixabay) and username for Geonames API

```text
WEATHERBIT_API_KEY=<your-api-key>
PIXABAY_API_KEY=<your-api-key>
GEONAMES_KEY=<your-username>
```

### Running the project

1. Execute `npm run install` to install all the dependencies
2. Execute `npm run build-prod` to compile the project using Webpack
3. Execute `npm run start` to run the API which statically serves the front-end app.

### Project dependencies

#### Client app

None. Just vanilla JavaScript.

#### Server API

##### NPM Packages

1. body-parser
2. cors
3. dotenv
4. express
5. follow-redirects
6. webpack
7. webpack-cli

##### Third-party services

1. Geonames.org
2. Weatherbit.io
3. Pixabay.com

## Extras

As an extra-mile, I included the Weather icon. It would only appear in case the trip is in at most until 16 days away.
