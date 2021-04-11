# piral-cli-dotenv

![Azure Build Status](https://dev.azure.com/FlorianRappl/piral-cli-plugins/_apis/build/status/FlorianRappl.piral-cli-dotenv?branchName=master) ![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)

Plugin for the `piral-cli`. Adds a flag to include environment variables from *.env* files.

Extends the Piral CLI command options to include dotenv files.

## Installation

Install the plugin either locally or globally.

We recommend the local installation:

```sh
npm i piral-cli-dotenv --save-dev
```

## Usage

### Including a .env File

Some commands of the Piral CLI will be extended with `--env` flags, e.g.,

```sh
piral debug <regular options> --env
```

The list of supported / extended commands is:

- `build-piral`
- `debug-piral`
- `validate-piral`
- `build-pilet`
- `debug-pilet`
- `publish-pilet`
- `validate-pilet`

The `--env` flags behave as follows.

#### No argument

Standard dotenv resolution mechanism, e.g., takes a `.env` file if available.

Example Call:

```sh
piral build <regular options> --env
```

#### File path

Uses the path to resolve and use the file as dotenv input.

Example input:

```plain
./secrets/.env
```

Example call:

```sh
piral build <regular options> --env .env.prod
```

#### Name

Uses a file `{name}.env` or `.env.{name}` as input for dotenv.

Example input:

```plain
prod
```

Example call:

```sh
piral build <regular options> --env prod
```

#### Variables

Uses the provided values as environment variables.

Example inputs:

```plain
FOO=BAR
FOO="BAR";BAR="FOO"
```

Example call:

```sh
piral build <regular options> --env SERVICE_URL="http://example.com"
```

## FAQ

### Does it work with every bundler?

It should work with `piral-cli-webpack`, `piral-cli-webpack5`, and `piral-cli-parcel`. Other bundlers are not tested.

### Are some environment variables overwritten?

Yes. Some variables are special (e.g., `NODE_ENV`) and will be set by the `piral-cli` anyway. This plugin focuses on non-special variables.

## License

This plugin is released using the MIT license. For more information see the [LICENSE file](LICENSE).
