# mandrill-migration

[![Build
Status](https://travis-ci.org/mrprompt/mandrill-migration.svg?branch=master)](https://travis-ci.org/mrprompt/mandrill-migration)
[![Code
Climate](https://codeclimate.com/github/mrprompt/mandrill-migration/badges/gpa.svg)](https://codeclimate.com/github/mrprompt/mandrill-migration)
[![Test
Coverage](https://codeclimate.com/github/mrprompt/mandrill-migration/badges/coverage.svg)](https://codeclimate.com/github/mrprompt/mandrill-migration/coverage)
[![Issue
Count](https://codeclimate.com/github/mrprompt/mandrill-migration/badges/issue_count.svg)](https://codeclimate.com/github/mrprompt/mandrill-migration)

Migration tool for Mandrill Templates.

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
