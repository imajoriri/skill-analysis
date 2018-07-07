
lambdaでのスマートスピーカーの解析に使用。

# install 

```
$ npm install skill-analysis
```

# dynamo設定

プライマリーキーを`key`でテーブルを作成

# インスタンス作成

```js
const tableName = "tableName" // 自動では作成されないので、手動で作成する必要あり
var Analysis = require('skill-analysis').Analysis;
var ana = new Analysis("smartHacksMagazineAnalysis");
```

# ハンドラー解析

ハンドラごとに以下を追加

```
await ana.putHandler("LaunchRequestHandler");
```

dynamoに以下のように保存される

* key: handlerCount
* mapAttr
 * LaunchRequestHandler: 1 << 呼び出されるごとに追加されて行く




