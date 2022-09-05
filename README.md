# ADSScanExplorerUI

User interface for ADS Scan Explorer

## Configuration

Configure environment variables, ports and such in the `./docker/{environment}.yaml` files.

## Setup

Create the container and start the application by running docker compose with environment specific settings.
```
docker compose -f docker/docker-compose.yaml -f docker/{environment}.yaml up -d
```

## Tests

### Unit tests

Run unit tests
```
npm run test
```

Run unit test & get coverage report
```
npm run test:coverage
```

### End-to-end tests

Build and start the application
```
npm run build
npm run start:test
```

Run the tests
```
npm run test:e2e
```