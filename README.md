# <img src="https://i.imgur.com/qbSmJYY.png" alt="vscode-qiita" width="380px" />

![スクリーンショット](https://i.imgur.com/oyzlwX7.png)

> VSCode Qiita は **Visual Studio Code** で編集中の Markdownファイルを **Qiita** に簡単に投稿できる拡張機能です！

[![Build Status](https://travis-ci.com/neet/vscode-qiita.svg?branch=master)](https://travis-ci.com/neet/vscode-qiita)
[![Maintainability](https://api.codeclimate.com/v1/badges/c00b68ac7b99b4ffe755/maintainability)](https://codeclimate.com/github/neet/vscode-qiita/maintainability)
[![Version](https://vsmarketplacebadge.apphb.com/version/neetshin.vscode-qiita.svg)](https://marketplace.visualstudio.com/items?itemName=Neetshin.vscode-qiita)
[![Installs](https://vsmarketplacebadge.apphb.com/installs/neetshin.vscode-qiita.svg)](https://marketplace.visualstudio.com/items?itemName=Neetshin.vscode-qiita)


## 問題の報告 / フィードバック
開発にご協力いただきありがとうございます 🙏
- バグの報告、及び新しい機能のリクエストはGitHub内の [issueページ](https://github.com/neet/vscode-qiita/issues) から行えます。
- もちろん、issueを建てずにフォークして [pull request](https://github.com/neet/vscode-qiita/pulls) を送っていただいても構いません！
- Visual Studio Marketplaceから評価してフィードバックを送っていただくことも可能です。

## Qiitaアカウントの連携方法
Qiitaの[アプリケーションページ](https://qiita.com/settings/applications)を開き、新しいアクセストークンを発行します。

![新しいアクセストークンを発行](https://i.imgur.com/LPtgosR.png)

アクセストークンを発行します。説明と、必要に応じてスコープを付与し発行してください。

![アクセストークンの発行](https://i.imgur.com/jHBsMSp.png)

生成されたアクセストークンをコピーして保存してください。

![アクセストークン](https://i.imgur.com/l6V6qmg.png)

コピーしたアクセストークンをVSCodeのユーザー設定 > Qiitaからアクセストークンのテキストボックスに貼り付けてリドードしてください。
![ユーザー設定](https://i.imgur.com/YKhdRZ5.png)

## 拡張機能の設定
### `qiita.token`
Qiita APIのアクセストークンを設定します。
### `qiita.tweetOnCreateItem`
投稿を公開した際にTwitterで共有するかどうかを指定できます。(Twitter連携ログイン済みの場合のみ)
### `qiita.gistOnCreateItem`
投稿を公開した際にGitHub Gistで共有するかどうかを指定できます。(GitHub連携ログイン済みの場合のみ)

## 開発
```
yarn --pure-lockfile
yarn run compile
yarn run test
```

---

## メンテナー
<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/neet">
          <img width="120" height="120" src="https://github.com/neet.png?size=120">
          </br>
          Neetshin
        </a>
      </td>
    </tr>
  <tbody>
</table>

## ライセンス
MIT
