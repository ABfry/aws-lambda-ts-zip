# Lambda Package

A tool for compiling and packaging AWS Lambda functions created in TypeScript into ZIP files.

## Overview

This tool allows you to easily create deployment packages for AWS Lambda functions written in TypeScript. It compiles your TypeScript code and packages it together with the necessary dependencies into a ZIP file.

## Installation

You can install it using npm:

```bash
# Global installation
npm install -g @abfry0620/lambda-package

# Or install in your project
npm install --save-dev @abfry0620/lambda-package
```

## Usage

### Command Line

```bash
# When installed globally
lambda-package

# Using npx
npx @abfry0620/lambda-package
```

### As a Script

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

## Process Flow

1. Clean up existing `dist` directory and `packages` directory
2. Compile TypeScript code (`npm run build`)
3. Install production dependencies only
4. Package compiled code and dependencies into a ZIP file
5. Restore development dependencies

## License

MIT

## Author

abfry0620
