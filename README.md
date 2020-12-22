# <img src="https://i.imgur.com/qbSmJYY.png" alt="vscode-qiita" width="380px" />

![スクリーンショット](https://i.imgur.com/oyzlwX7.png)

> VSCode Qiita は **Visual Studio Code** で編集中の Markdownファイルを **Qiita** に簡単に投稿できる拡張機能です！

[![Build Status](https://travis-ci.com/neet/vscode-qiita.svg?branch=master)](https://travis-ci.com/neet/vscode-qiita)
[![Maintainability](https://api.codeclimate.com/v1/badges/c00b68ac7b99b4ffe755/maintainability)](https://codeclimate.com/github/neet/vscode-qiita/maintainability)
[![Version](https://vsmarketplacebadge.apphb.com/version/neetshin.vscode-qiita.svg)](https://marketplace.visualstudio.com/items?itemName=Neetshin.vscode-qiita)
[![Installs](https://vsmarketplacebadge.apphb.com/installs/neetshin.vscode-qiita.svg)](https://marketplace.visualstudio.com/items?itemName=Neetshin.vscode-qiita)

## インストール
Visual Studio Code上で `Ctrl+P`/`⌘+P` でコマンドパレットを開き、以下のコマンドを実行します。

```
ext install neetshin.vscode-qiita
```
<a href='https://www.patreon.com/neetshin'><img src='https://c5.patreon.com/external/logo/become_a_patron_button.png' alt='Become a patron' width='140px' /></a>

## フィードバック
開発にご協力いただきありがとうございます 🙏
- バグの報告、及び新しい機能のリクエストはGitHub内の [issueページ](https://github.com/neet/vscode-qiita/issues) から行えます。
- もちろん、issueを建てずにフォークして [pull request](https://github.com/neet/vscode-qiita/pulls) を送っていただいても構いません！
- [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Neetshin.vscode-qiita)から評価してフィードバックを送っていただくことも可能です。

## 使い方
### Qiitaアカウントの連携方法
Qiitaの[アプリケーションページ](https://qiita.com/settings/applications)を開き、新しいアクセストークンを発行します。

![新しいアクセストークンを発行](https://i.imgur.com/LPtgosR.png)

アクセストークンを発行します。説明と応じてスコープを付与し発行してください。閲覧のみの場合は `read_qiita` を、編集も行う場合は `read_qiita`と`write_qiita`を選択します。

![アクセストークンの発行](https://i.imgur.com/jHBsMSp.png)

生成されたアクセストークンをコピーして保存してください。

![アクセストークン](https://i.imgur.com/l6V6qmg.png)

コピーしたアクセストークンをVSCodeの *ユーザー設定 > Qiita* からアクセストークンのテキストボックスに貼り付けてください。再起動が必要な場合があります。

![ユーザー設定](https://i.imgur.com/YKhdRZ5.png)

### 投稿を公開
開いているテキストエディター上で右クリック > Qiitaで公開 から編集中のファイルをQiitaに公開することができます。公開範囲、タイトル、タグも表示されるダイアログから設定できます。

![Qiitaで公開(コンテキスト)](https://i.imgur.com/Lblsr7U.png)

また、`Ctrl+Shift+P`/`⌘+Shift+P`から表示できるコマンドパレットからも公開することができます。この場合は、現在アクティブなファイルが公開されます。

![Qiitaで公開(コマンドパレット)](https://i.imgur.com/Zn4mBQq.png)

### 投稿の編集
既存の投稿は右側に表示されるアクティビティバーからQiitaのロゴをクリックした際に表示されるエクスプローラーから編集できます。

![既存の投稿](https://i.imgur.com/JgnGs8Q.png)

公開範囲やタイトル、タグなどは右クリックメニューから変更可能です。

![既存の投稿(コンテキスト)](https://i.imgur.com/MdmqXRI.png)

### 拡張機能の設定
ユーザー設定は `Ctrl+,` / `⌘+,` からGUIで変更できますが、必要に応じて `settings.json` 内の以下のキーを直接編集して設定を変更できます

### `qiita.token`
`string`: Qiita APIのアクセストークンを設定します。
### `qiita.tweetOnCreateItem`
`boolean`: 投稿を公開した際にTwitterで共有するかどうかを指定できます。(Twitter連携ログイン済みの場合のみ)

## 開発
```
yarn --pure-lockfile
yarn run compile
yarn run test
```

## ライセンス
MIT
