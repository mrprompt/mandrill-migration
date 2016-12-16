# mandrill-migration

[![Build
Status](https://travis-ci.org/mrprompt/mandrill-migration.svg?branch=master)](https://travis-ci.org/mrprompt/mandrill-migration)

Migration tool for Mandrill Tamplates.

Generate a migration file with templates on draft status and publish then.

## Available Commands

```
list <dir>      list available migrations
generate <dir>  generate a new migration file from availables drafts on Mandrill
publish <name>  publish a single template
migrate <dir>   publish all templates on draft bucket
drafts          list available drafts on Mandrill
templates       list available templates on Mandrill
```

## Install

``` 
npm install -g mandrill-migration
```

## Use

```
export MANDRILL_API_KEY="<your-mandrill-api-key>"

mandrill-migration <command> <arg>
```

## Contributing

Some ways to contribute

- Star this repo
- Make a fork
- Create an Issue
- Send a Pull Request
- Use

## Tests

```
npm test
```

## License
MIT
