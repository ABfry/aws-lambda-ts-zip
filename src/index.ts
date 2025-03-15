#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';

// 設定の型定義
interface PackageConfig {
  distDir: string;
  packageDir: string;
  packageName: string;
}

// デフォルト設定
const defaultConfig: PackageConfig = {
  distDir: 'dist',
  packageDir: 'packages',
  packageName: 'lambda-function.zip',
};

// コマンドを実行する関数
function runCommand(command: string): void {
  console.log(`実行: ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`実行エラー: ${command}`);
    console.error(error);
    process.exit(1);
  }
}

// 設定ファイルを読み込む関数（存在しなければ作成）
function loadOrCreateConfig(): PackageConfig {
  const configPath = path.resolve(process.cwd(), 'lambda-package-config.json');

  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
    console.log(`設定ファイルが作成されました: ${configPath}`);
    return defaultConfig;
  }

  try {
    const userConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    return { ...defaultConfig, ...userConfig };
  } catch (error) {
    console.warn('設定ファイルの読み込みに失敗しました。デフォルト設定を使用します。');
    return defaultConfig;
  }
}

// パッケージング処理を実行する関数
function createPackage() {
  // 設定ファイルを読み込みまたは作成
  const config = loadOrCreateConfig();
  console.log('パッケージ作成プロセスを開始...');

  // クリーンアップ
  console.log('クリーンアップ中...');
  if (fs.existsSync(config.distDir)) {
    fs.removeSync(config.distDir);
  }
  if (fs.existsSync(config.packageDir)) {
    fs.removeSync(config.packageDir);
  }
  console.log('クリーンアップ完了');

  // ビルド
  console.log('ビルド中...');
  runCommand('npm run build');
  console.log('ビルド完了');

  // packages ディレクトリを作成
  runCommand(`mkdir -p ${config.packageDir}`);

  // 本番用の依存関係のみをインストール
  runCommand('npm ci --production');

  // デプロイメントパッケージを作成
  runCommand(`cd ${config.distDir} && zip -r ../${config.packageDir}/${config.packageName} .`);
  runCommand(`cd node_modules && zip -r ../${config.packageDir}/${config.packageName} .`);

  // 開発用の依存関係を復元
  runCommand('npm ci');

  console.log(`パッケージが ${config.packageDir}/${config.packageName} に作成されました。`);
}

const program = new Command('lambda-package');

program
  .name('lambda-package')
  .description('Compile and Zip programs created in TypeScript for AWS Lambda.')
  .version('1.0.1')
  .action(() => {
    createPackage();
  });

// コマンド実行
program.parse(process.argv);

// コマンドが指定されていない場合はヘルプを表示
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
