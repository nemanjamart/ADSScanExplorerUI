# ADSScanExplorerUI

## Configuration
Configure environment variables, ports and such in the `./docker/{environment}.yaml` files.
## Setup

Create the container and start the application by running docker compose with environment specific settings.
```
docker compose -f docker/docker-compose.yaml -f docker/{environment}.yaml up -d
```
