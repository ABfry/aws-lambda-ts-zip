# Lambda Package

TypeScript で作成された AWS Lambda 関数をコンパイルして ZIP パッケージ化するためのツールです。

## 概要

このツールは、TypeScript で書かれた AWS Lambda 関数のデプロイメントパッケージを簡単に作成することができます。TypeScript コードをコンパイルし、必要な依存関係と一緒に ZIP ファイルにパッケージングします。

## インストール

npm を使用してインストールできます：

```bash
# グローバルにインストール
npm install -g @abfry0620/lambda-package

# または、プロジェクト内にインストール
npm install --save-dev @abfry0620/lambda-package
```

## 使い方

### コマンドライン

```bash
# グローバルインストールの場合
lambda-package

# npxを使用する場合
npx @abfry0620/lambda-package
```

### スクリプトとして

package.json のスクリプトに追加して使用することもできます：

```json
"scripts": {
  "package": "lambda-package"
}
```

そして、以下のコマンドを実行します：

```bash
npm run package
```

## 設定

デフォルトでは、以下の設定で動作します：

- `distDir`: 'dist' - コンパイル後のファイルが格納されるディレクトリ
- `packageDir`: 'packages' - 出力される ZIP ファイルが格納されるディレクトリ
- `packageName`: 'lambda-function.zip' - 出力される ZIP ファイルの名前

カスタム設定を行うには、プロジェクトのルートディレクトリに `lambda-package-config.json` ファイルを作成します：

```json
{
  "distDir": "build",
  "packageDir": "deploy",
  "packageName": "my-lambda.zip"
}
```

初回実行時に設定ファイルが存在しない場合は、デフォルト設定で自動的に作成されます。

## 動作の流れ

1. 既存の `dist` ディレクトリと `packages` ディレクトリをクリーンアップ
2. TypeScript コードをコンパイル (`npm run build`)
3. 本番用の依存関係のみをインストール
4. コンパイルされたコードと依存関係を ZIP ファイルにパッケージング
5. 開発用の依存関係を復元

## ライセンス

MIT

## 作者

abfry0620
