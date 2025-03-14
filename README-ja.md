# lambda-package

[English version here](README.md)

TypeScript で作成された AWS Lambda 関数をコンパイルして ZIP パッケージ化する

## インストール

`npx`を使用して直接実行できる：

```bash
npx @abfry0620/lambda-package

# または必要に応じてグローバルにインストール
npm install -g @abfry0620/lambda-package
```

---

## 使い方

### ヘルプの表示

```bash
npx @abfry0620/lambda-package --help
```

出力例：

```sh
Usage: lambda-package [options]

Compile and Zip programs created in TypeScript for AWS Lambda.

Options:
  -V, --version  output the version number
  -h, --help     display help for command
```

### バージョンの表示

```bash
npx @abfry0620/lambda-package --version
```

---

## 処理の流れ

ツールを実行すると、以下の手順が実行される：

1. 既存の `dist` ディレクトリと `packages` ディレクトリをクリーンアップ
2. TypeScript コードをコンパイル (`npm run build`)
3. 本番用の依存関係のみをインストール
4. コンパイルされたコードと依存関係を ZIP ファイルにパッケージング
5. 開発用の依存関係を復元

## 設定

デフォルトでは、以下の設定で動作する：

- `distDir`: 'dist' - コンパイル後のファイルが格納されるディレクトリ
- `packageDir`: 'packages' - 出力される ZIP ファイルが格納されるディレクトリ
- `packageName`: 'lambda-function.zip' - 出力される ZIP ファイルの名前

カスタム設定を行うには、プロジェクトのルートディレクトリに `lambda-package-config.json` ファイルを作成する：

```json
{
  "distDir": "build",
  "packageDir": "deploy",
  "packageName": "my-lambda.zip"
}
```

初回実行時に設定ファイルが存在しない場合は、デフォルト設定で自動的に作成される。

---

## プロジェクトでの使用

package.json のスクリプトに追加して使用することもできる：

```json
"scripts": {
  "package": "lambda-package"
}
```

そして、以下のコマンドを実行する：

```bash
npm run package
```

---

## ライセンス

[MIT ライセンス](LICENSE)

---

## 作者

ABfry
