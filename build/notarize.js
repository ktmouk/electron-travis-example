const path = require('path')
const { notarize } = require('electron-notarize')

// TravisCIの環境変数 (process.env) から取得
const appleId = process.env.APPLE_ID
const appleIdPassword = process.env.APPLE_PASSWORD

// .appのパスを設定
const appPath = path.resolve(__dirname, '../dist/mac/Example.app')

// package.jsonからappIdを取得
const configPath = path.resolve(__dirname, '../package.json')
const config = require(configPath)
const appBundleId = config.build.appId

exports.default = async () => {
  // appleId, appleIdPasswordが取得できない場合はスキップ
  // プルリクエストの場合も成果物 (.exe, .AppImage, .dmg) をドラフトタグにアップロードしないためスキップ
  if (!appleId || !appleIdPassword || process.env.TRAVIS_PULL_REQUEST !== 'false') {
    console.warn('notarize skipped');
    return;
  }

  // notarizeする
  await notarize({
    appBundleId,
    appPath,
    appleId,
    appleIdPassword,
  })
}
