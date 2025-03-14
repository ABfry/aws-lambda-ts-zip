# npx command for packaging AWS Lambda functions

[日本語版はこちら](README-ja.md)

A CLI tool for compiling and packaging AWS Lambda functions created in TypeScript into ZIP files.

## Installation

Simply run it using `npx`:

```bash
npx @abfry0620/lambda-package

# Or install globally if you prefer
npm install -g @abfry0620/lambda-package
```

## Usage

### Display Help

```bash
npx @abfry0620/lambda-package --help
```

Example output:

```sh
Usage: lambda-package [options]

Compile and Zip programs created in TypeScript for AWS Lambda.

Options:
  -V, --version  output the version number
  -h, --help     display help for command
```

### Display Version

```bash
npx @abfry0620/lambda-package --version
```

## Process Flow

When you run the tool, it performs the following steps:

1. Clean up existing `dist` directory and `packages` directory
2. Compile TypeScript code (`npm run build`)
3. Install production dependencies only
4. Package compiled code and dependencies into a ZIP file
5. Restore development dependencies

## Configuration

By default, it works with the following settings:

- `distDir`: 'dist' - Directory where compiled files are stored
- `packageDir`: 'packages' - Directory where the output ZIP file is stored
- `packageName`: 'lambda-function.zip' - Name of the output ZIP file

To customize the configuration, create a `lambda-package-config.json` file in your project's root directory:

```json
{
  "distDir": "build",
  "packageDir": "deploy",
  "packageName": "my-lambda.zip"
}
```

If the configuration file doesn't exist on the first run, it will be automatically created with default settings.

## Using in Your Project

You can also add it to your package.json scripts:

```json
"scripts": {
  "package": "lambda-package"
}
```

Then run:

```bash
npm run package
```

## License

[MIT License](LICENSE).

## Author

ABfry
