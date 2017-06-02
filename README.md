# deresute-ssr

React/Redux,Express,MongoDBで作成しているデレステのSSR所持率を表示するwebアプリです。

### 実行方法  
* データベースインポート
	* mongodbにデータベースを入れる
	
```
mongoimport --db deresute --collection characters --type json --file deresute_ssr.json
```

* mongodでmongodbの起動

* サーバ側で
```
yarn
yarn start
```
で起動する

* deresute-ssr/clientで
```
yarn
yarn start
```

* ローカルホストで起動
	* localhost:3000
