# Server-side development

## How to add model

In 'server/' directory:

```
1. Generate TypeORM entity file
> ./cli.sh gen:model --name {modelName}

2. Edit generated file

3. Generate TypeORM migration file
> ./cli.sh gen:migration --name {modelName}
```
