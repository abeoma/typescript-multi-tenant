# Server-side development

## How to add model

In 'server/' directory:

```

1. Generate TypeORM entity file
> ./cli.sh run:typeorm entity:create --connection {connectionName} --name {modelName}
(connectionName: 'admin' or 'tenant')

2. Edit generated file

3. Generate TypeORM migration file
> ./cli.sh run:typeorm migration:generate --connection {connectionName} --name {modelName}

4. Run migration
> ./cli.sh run:typeorm migration:run --connection {connectionName}
```

### Other useful typeorm commands

- query "SHOW DATABASES;"
- migration:show
- migration:revert
