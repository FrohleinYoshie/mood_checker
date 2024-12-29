![image](https://github.com/user-attachments/assets/046f0d12-132e-4521-8663-168398e4c8cb)

## このサービスについて
こちらはテレビアニメ「理系が恋に落ちたので証明してみた。」第6話にて放映された「理系が恋に落ちたのでキスしてみた。」という回にて放映された計算方法を引用しモバイルアプリとして作成したものになっています。
計算式を以下にまとめます。

## ムード値の定義

ムード値（M）は以下の5つの指数の合計として定義されます：

M = P<sub>1</sub> + P<sub>2</sub> + P<sub>3</sub> + P<sub>4</sub> + P<sub>5</sub>

## 各指数の定義

### P<sub>1</sub> - 美しさ指数
場の美しさをn人で評価した平均値  
$x_1 = \frac{1}{n}\sum_{i=1}^{n}\frac{1}{5}a_i \quad (-\infty < a_1 \leq 100, \text{ n は評価者の人数})$

### P<sub>2</sub> - 第三者指数
注目する人数（x<sub>2</sub>）に応じた指数  
- x<sub>2</sub> = 0 のとき：P<sub>2</sub> = 20
- x<sub>2</sub> > 0 のとき：P<sub>2</sub> = -10000x<sub>2</sub>

### P<sub>3</sub> - 照度指数
照度（x<sub>3</sub>、ルクス）に基づく指数  
$P_3 = \frac{1}{5}104-2(\frac{x_3}{20}+\frac{20}{x_3})$

### P<sub>4</sub> - 静けさ指数
騒音値（x<sub>4</sub>、db）に応じた指数  
- $0 \leq x_4 < 20$ のとき：P<sub>4</sub> = 100
- $20 \leq x_4 < 70$ のとき：P<sub>4</sub> = 100 - 2(x<sub>4</sub> - 20)
- $70 \leq x_4$ のとき：P<sub>4</sub> = -∞

### P<sub>5</sub> - 見つめ合い指数
沈黙見つめ合い秒数（x<sub>5</sub>）による指数  
- $0 < x_5 < 30$ のとき： $P_5 = \frac{100}{30}x_5$
- $30 \leq x_5 \leq 60$ のとき： $P_5 = 100$
- $60 < x_5$ のとき： $P_5 = 100 - 5(x_5 - 60)$

## 機能一覧
|起動時|計算時|
| --- | --- |
|<img src="https://github.com/user-attachments/assets/3dcfaf0b-3b32-482e-8ec8-7fcdfaf7340e" width="300px">|<img src="https://github.com/user-attachments/assets/f987365e-6ddd-4076-8c8b-0a8a8eb74932" width="300px">|
|それぞれのセクションにあった数値を入れてください|数値を入力したら100点満点で計算されます|

## 使用技術
|カテゴリー|フレームワーク・言語・技術|
|--- |---|
|フロントエンド|EXPO・TypeScript|
|バックエンド|TypeScript|
|デザイン|Figma|

## 今後の展望
- データベースの実装
- 位置情報、時間をも含めて保存
- 照度、騒音の数値をスマホから計算する機能の実装
