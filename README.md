# electron-react-redux-webpack

## プロジェクトの作り方
1. gitから落とす
```
git clone https://github.com/rio1228/electron-react-redux-webpack.git
```
2. package.jsonをinstall
```
npm install
```
3. start
```
yarn start
```
もしくは
```
npm run-script start
```
## ソースを更新する場合
#### 変更しないといけないところ
package.jsonのnameとcomponentの部分を自分のプロジェクトに合わせる
```package.json
"name": "electron-template"
"component": "asar pack ./out ./clipfmt.asar",
"package": "electron-packager ./ clipfmt --platform=darwin,win32 --arch=x64"
```
package.jsonを何かしら変更した場合は
```
npm install
```
プロジェクトをビルド
```
yarn build
```
もしくは
```
npm run-script build
```

## 注意点
winsowsの場合、macのプロジェクトのアプリをパッケージングしたい時はコマンドプロンプトを管理者権限で実行する必要がある

electron-packager {ソースィディスクリ} {アプリ名} --platform = {プラットフォーム} --arch = {コンテンツキー} --version（バージョン）[その他のオプション...]

プラットフォーム···すべて、linux、win32、darwinのいずれかを選択してください。
            「--all」は全部入りのパッケージです。
            「ダーウィン」はmacのことです。複数選択はカンマ区切りです。
アーチ・・・オール、ia32、x64のいずれかを選択してください
バージョン···電子のバージョンを指定。（* electron -v *で確認）