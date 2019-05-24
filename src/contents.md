SciRuby は 科学技術計算，データ可視化用途のGem群の総称です．

## なぜSciRubyプロジェクトを進めているのか?

- Ruby言語開発者, サポート団体が言語の活用範囲を広げたいと考えているため.
  - Rubyコミッター([@ko1](https://github.com/ko1) [@mrkn](https://github.com/mrkn) [@ngoto](https://github.com/ngoto))が本プロジェクトに参加しています．
  - Rubyを通じたまちづくりを行う[しまねソフト研究開発センター](http://www.s-itoc.jp/) も,本プロジェクトをサポートしています
- Rubyで科学技術計算を行いたいと考えるユーザーがいるため.
- SciRubyプロジェクトを通して、Pythonの科学技術計算ライブラリに関する知見を深めるため
- 楽しいから


### 実用可能なSciRubyプロジェクトのライブラリ

- [numo-narray](https://rubygems.org/gems/numo-narray/)
    - Pythonにおけるnumpyに相当するライブラリ
    - 実用例：[100 narray exercises](https://github.com/ruby-numo/narray/wiki/100-narray-exercises)
- [daru](https://rubygems.org/gems/daru)
    - Pythonにおけるpandasに相当するライブラリ
    - 実用例：[pandas tutorial with daru](https://github.com/sciruby-jp/survey)
- [rumale](https://github.com/yoshoku/rumale)
    - 機械学習のライブラリ

## SciRubyのプロジェクトにはどのような課題があるのか?

左の図は、PythonとRubyのサイエンス分野のライブラリの関係を示したものです.
ライブラリ同士をつなぐ線は、各パッケージが連携して機能することを表し、ノードの大きさはGitHubでのstarの数を表しています．

ライブラリ間の関係性(ノードとノードを繋ぐ線)に着目すると、Pythonではnumpyが各ライブラリを中継するハブとなり、ライブラリ間の連携を助けていることがわかります。
それに対してRubyでは、各ライブラリが互いに独立して存在しており、gem間の連携が難しい状態です.

Pythonであれば一つのデファクトスタンダードなライブラリがある分野に、Rubyでは小さなライブラリが独立して存在している、という状況も存在します。
例えば、Pythonでの行列演算ライブラリとしては、numpyが圧倒的な人気を獲得していますが、Rubyにおいては、nmatrix, numo-narray, mdarrayなどの行列演算ライブラリが存在し、混乱やライブラリの分断の原因となっています. 

