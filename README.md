# frontend-project-lvl2

### Tests and linter status:

[![own test](https://github.com/tresor13/frontend-project-lvl2/actions/workflows/own%20test.yml/badge.svg)](https://github.com/tresor13/frontend-project-lvl2/actions/workflows/own%20test.yml)
[![linter](https://github.com/tresor13/frontend-project-lvl2/actions/workflows/lint.yml/badge.svg)](https://github.com/tresor13/frontend-project-lvl2/actions/workflows/lint.yml),
[![hexlet-check](https://github.com/tresor13/frontend-project-lvl2/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/tresor13/frontend-project-lvl2/actions/workflows/hexlet-check.yml),
<a href="https://codeclimate.com/github/tresor13/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/a4a4796b9c7bdbde98c1/maintainability" /></a>,
<a href="https://codeclimate.com/github/codeclimate/codeclimate/test_coverage"><img src="https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage" /></a>

# Difference generator

Difference generator is a command-line interface (CLI) program that calculate differences between two data structures or configuration files. Differece generator reads files, parse incoming data and build a tree of differences according to preassigned output.

### Main features:

- Supports two input formats: json, yaml.
- Generates a report in the form of plain text, stylish and json.

1. Pull the repository:

```
  git clone git@github.com:tresor13/frontend-project-lvl2.git
```

2. Establish a dependency:

```
  make install
  make publish
```

For help run `gendiff -h` or `gendiff --help`:

```
$ gengiff --help
Usage: gendiff [options] <filepath1> <filepath2>
Compares two configuration files and shows a difference.
Options:
  -v, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
```

Run:

```
gendiff [options] <path/to/file1> <path/to/file2>
```

## Work example.

## Running the compare 2 json files command.

<a href="https://asciinema.org/a/hcJcrtjsuc6p5b21Aysicsxf0" target="_blank"><img src="https://asciinema.org/a/hcJcrtjsuc6p5b21Aysicsxf0.svg" /></a>

## Perform a comparison of 2 json files with the format `plain`.

<a href="https://asciinema.org/a/N45biQhILTXYr1By78Nnj94Gl" target="_blank"><img src="https://asciinema.org/a/N45biQhILTXYr1By78Nnj94Gl.svg" /></a>
