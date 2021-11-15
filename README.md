# BARASU

## Developement Environment

```
> node -v
v16.5.0
```

### Node.js version and virtual environment management

Use nodenv.
https://github.com/nodenv/nodenv

```
> cat .node-version
16.5.0
```

## Getting started

```
# Build server
docker compose up app

# Setup seed data
yarn server:cli setup-dev-tenant

# Run frontend
yarn frontend start
```

## Add package

In root directory:

```
yarn frontend add hoo
yarn frontend add -D hoo

yarn server add hoo
yarn server add -D hoo
```
