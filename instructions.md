## Registering provider

Make sure you register the provider inside `start/app.js` file before making use hashids.

```js
const providers = [
  'adonis-sumo-logger/providers/SumoLoggerProvider'
]
```

## Configuration

Add new configuration inside logger module in config/app.js:

```js
    /*
    |--------------------------------------------------------------------------
    | SumoLogger Transport
    |--------------------------------------------------------------------------
    |
    | SumoLogger transport uses Sumo Logic JavaScript Logging SDK library
    | enables you to send custom log messages to an HTTP Source without
    | installing a Collector on your server.
    |
    */
    sumologger: {
      driver: 'sumologger',
      name: 'adonis-app',
      level: 'info',
      endpoint: Env.get('SUMOLOGGER_HTTP_ENDPOINT'),
      interval: 0,
      sendErrors: true,
      clientUrl: Env.get('APP_URL'),
      graphite: true
    }
```

## Environment variables
The configuration file makes use of **Environment variables**, make sure to define them for development and in production too

```
SUMOLOGGER_HTTP_ENDPOINT=https://collectors.xx.sumologic.com/receiver/v1/http/xxxxxx==
```
