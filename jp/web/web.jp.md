---
layout:         "default"
title:          "Mobile Web SDK インテグレーションガイト"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /jp/web/
lang:            "jp"
---
# 概要
---
Vpon モバイルウェブSDKは、あらゆる規模のウェブサイト運営者様のVpon広告による収益化を可能にします。
> **Note:** この広告はモバイル端末にのみ対応しており、ユーザーがPCを通じて対象のウェブサイトを閲覧しても広告は表示されません。

# 要件
---
1. HTMLの基本的な概念
2. Vponへの登録・ウェブサイトの申請・プロパティIDを取得します。
3. モバイルウェブサイトコードを変更する権限
<br><br>

# バナー広告のサイズ
---
現在の Vpon モバイルウェブSDK は、以下の広告フォーマットをサポートします。

| 名称              | サイズ(幅×高さ) |
| :---------------- | :------------:|
| Banner            |    320x50     |
| Medium Rectangle  |    300x250    |

<br>
<br>

# 広告コードの組み込み
---

## 基本編
1. ウェブページ内の広告を配置したい位置に以下のコードを追加します。

```html
<body>
...
  <vpon vpon_ad_test="1"
        vpon_ad_licensy_key="your_first_vpon_banner_id_here"
        vpon_ad_format="320x50_mb"
        debug="true"></vpon>
...
  <vpon vpon_ad_test="1"
        vpon_ad_licensy_key="your_second_vpon_banner_id_here"
        vpon_ad_format="320x50_mb"
        debug="true"></vpon>
...
  <vpon vpon_ad_test="1"
        vpon_ad_licensy_key="your_third_vpon_banner_id_here"
        vpon_ad_format="300x250_mb"
        debug="true"></vpon>
...
  <script type="text/javascript"  src="http://m.vpon.com/sdk/vpadn-sdk.js"> </script>
</body>
```
> **Note:**<br>

>* 同一のウェブページ上には最多で3カ所のプロパティを組み込み、各プロパティはそれぞれ異なるプロパティIDを使用してください。
>* JavaScript は、1つだけを、かつ</body>の前に置きます。
>* 保存完了後、ウェブページを再読み込みすると、 \<vpon\>タグの位置に「テスト広告」を受け取ることを確認できます。(オンラインにする場合、vpon_ad_test="0"と設定し、テスト広告を受け取らない設定に変更してください。
<br>

## Advanced Setup


名称                  |        說明                      | 必須       |  インスタンス
:--------------------:|:---------------------------------------:|:-------------:|:------------------------:
vpon\_ad\_licensy\_key| 広告枠 ID                               |  Y         |<font color="red">Vpon License Key（=プロパティID）を入力して</font>
vpon\_ad\_format      | 広告フォーマット：320x50\_mb, 300x250\_mb   |   Y       |     “320x50\_mb”
vpon\_ad\_test        |   テスト広告を取得するかどうか              | N       |   1(はい)/0(いいえ)、デフォルト: (はい)
debug                 | コンソールにデバッグ情報を表示するかどうか      |  N      |  true/false、デフォルト:false
openTab               |新しいタブで広告コンテンツを表示するには     |N         |  true/falseをtrueにセットしてください

<br>

# インスタンスの作成
---
```html
<html>
  <head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  </head>
  <body>
    <h1>The Test Page</h1>

    <div>
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="Your Banner ID"
            vpon_ad_format="320x50_mb"
            debug="true"></vpon>
    </div>
    </br>
    <div>
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="Your Banner ID"
            vpon_ad_format="300x250_mb"
            debug="true"></vpon>
    </div>
    <script type="text/javascript" src="http://m.vpon.com/sdk/vpadn-sdk.js"> </script>
  </body>
```

> **ご注意：** 下記LicenseKeyは例となりますので、収益化のためにはご自身で登録済みのLicenseKeyに変更してください。

<br>
<br>


# DFPモバイルウェブ
---
このページはバナー広告の表示にモバイルサイトDFPを使用している方向けのものです。モバイルウェブAPIに親しみのない方はまず "モバイルウェブSDK" のページごご参照ください。その後、このページを参考にDFPの設定を進めてください。

## DFP 広告タグの生成
---
DFPのユーザーインターフェースにて、 [シングルリクエストを有効にする] にチェックを入れ生成したタグをウェブページのにヘッドタグ内に埋め込み、ドキュメントタグを広告を表示したい場所に埋め込みます。


## 広告枠の設定
---
DFP ユーザインターフェース内の[Here]:

1. [在庫] をクリック。
2. 広告ユニットの各種設定（名称、サイズ、ターゲットウインドウなど）を保存。
3. [タグを作成] をクリックし、広告コードを生成。
(作成するタグの種類は [Google サイト運営者タグ] を選択。

![MobileDPF_Eng]

## オーダー、広告申込情報、クリエイティブの設定
DFP スタンダードを使用して新しい広告キャンペーンを始めるには、まず新しいオーダーを作成します。次に広告申込情報を作成し、クリエイティブを追加します。最後にオーダーを承認すると、配信が可能になります。DFP では、予約タイプの広告申込情報（スポンサーシップ、標準）の場合、オーダーを承認するまで在庫は予約されません。

### オーダーの手動による作成
手動でオーダーを作成する方法は以下の通りです。

1. DFP スタンダードのアカウントで、[オーダー] タブをクリックします。
2. [新しいオーダー] をクリックします。
3. 各欄にオーダー情報を入力します。 <br>
(オーダーの名前は、ネットワーク内で固有である必要があります)。
4. 広告申込情報の詳細を入力します。
5. [在庫の確認] をクリックして、オーダーで十分なインプレッションを取得できることを確認します。十分なインプレッションを取得できないにもかかわらずオーダーを保存してしまうと、配信不足となり広告主との契約違反につながるおそれがあります。
![Warning]
6.  [保存]をクリックします。オーダーを作成したら、次にオーダーを承認する必要があります。承認を行わないと広告申込情報は配信可能となりません。オーダーを承認する方法については、こちらをご覧ください。


### 広告申込情報

広告申込情報の作成方法

1. DFP スタンダードのアカウントで、[オーダー] タブをクリックします。
2. 新しいオーダーを作成するか、リスト内の既存のオーダーをクリックします。
3. [新しい広告申込情報] をクリックします。
4. 広告申込情報の名前を入力します。広告申込情報の名前は、ネットワーク内で固有のものにする必要があります。
5. アップロードする広告に対応する広告枠のサイズを入力します。
6.（オプション）広告申込情報に関するメモを入力します。メモを入力しておくと、広告申込情報の入稿に役立つことがあります。
7. 広告申込情報のタイプ、日付、数量、費用を入力します。
8. [配信の調整] で配信設定を入力します（オプション）。詳しくは、下記のオプションの配信設定をご覧ください。
9. ターゲティングする広告枠を選択します。

広告ユニット、プレースメント、またはその両方を選択できます。ターゲティングする広告枠を探すには、ネットワークの広告枠のリストを見るか、検索を行います。

ネットワークの名前の付いた広告ユニットは、ネットワーク内のすべての広告ユニットを表します。広告申込情報でこのネットワーク レベルの広告ユニットをターゲティングすると、ネットワークに含まれるすべての広告ユニットがその広告申込情報のターゲットとなります。

例:
![AddTargeting_jp.png]

10.追加のターゲティング条件を入力し、特定のオーディエンスをターゲティングします（オプション）。広告申込情報で広告ユニットやプレースメントをターゲティングしない場合、その広告申込情報はネットワーク掲載として設定されます。つまり、ウェブサイト上のどの広告ユニットにも広告が配信される可能性があります。

11.[保存]をクリックします。

### クリエイティブの入稿

1. クリエイティブを追加したい広告申込情報をクリックします。必要に応じて新しい広告申込情報を作成することも可能です。
2. [クリエイティブを追加]をクリックします。広告申込情報の全てのクリエイティブと 広告ユニットのサイズが左パネルにリストアップされます。リスト内のいずれのユニットサイズの広告も追加することが可能です。
3. 広告申込情報に複数のクリエイティブをまとめてドラッグ&ドロップするか、1 つずつ追加することができます。

### クリエイティブを 1 つだけ追加
クリエイティブタイプの選択: [所有] 内の [第三者] を選択します。
<img src="{{site.imgurl}}/Moblie_DFP_creative_jp.png" alt="" class="width-600" />



#### クリエイティブの設定
[コード] フィールドには以下の通り記入してください。
例:

![MobileDFP_creativeSetting]

```html
<vpon vpon_ad_test="0"
       vpon_ad_licensy_key="Your license Key"
       vpon_ad_format="320x50_mb"
       debug="true"></vpon>
      <script type="text/javascript"  src="http://m.vpon.com/sdk/vpadn-sdk.js"> </script>
```
> **Note**: vpon vpon_ad_test="1" はテスト広告を取得、 vpon vpon_ad_test="0"は本番用広告を取得します。


#### 空き枠に対するコールバック
コードスニペットは以下の通りです。:


```html
<div id="Vpadn_tag"></div>
<script src="https://www.googletagservices.com/tag/js/gpt.js"></script>
<script type='text/javascript'>
  googletag.cmd.push(function() {
    googletag.defineSlot('your_ad_unit', [320, 50], 'Vpadn_tag').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
  });
</script>
<script>
  function vponCallBackMethod(adStatus) {
    if (adStatus != 0) {
      googletag.cmd.push(function() {
        googletag.display('Vpadn_tag');
      });
    }
  }
</script>

<vpon vpon_ad_test="1" vpon_ad_licensy_key="your_license_key" vpon_ad_format="320x50_mb" debug="true" ad_request_callback="vponCallBackMethod" is_rotate="false"></vpon>

<script type="text/javascript" src="http://m.vpon.com/sdk/vpadn-sdk.js">
</script>
```
> **Note**：

> 1. your_ad_unit: [在庫]から取得した広告ユニットに差し替えてください。ここでの広告ユニットフォーマットは次のようになります：'/network_ID/ad_unit.'　また、この広告ユニットは、Vponの広告在庫が不足している場合に次に呼び出す広告申込情報の対象となっています。 例えば、ここでの広告申込情報はAdsenseのスクリプトを含んでいます。第三者広告配信サーバーからDFPに返された後続の広告リクエストは必ず固有である必要があります。したがって、1広告に対して同じ第三者ネットワークは呼び出すことはしないでください。
> 2. [320, 50]： 必要な広告サイズに変更してください。
> 4. your_license_key：VponのバナーIDを記載してください。


Example：
![DFP_WEB_CALLBACK]

このタグがどのように動くかについての詳しい情報はこちらをご参照ください: [GAM tags](https://support.google.com/dfp_sb/answer/1693146?hl=en)

# ヒント
---
[DFP Small Business](https://support.google.com/dfp_sb/) <br>
[Google Developers DFP Banner Ads](https://developers.google.com/mobile-ads-sdk/docs/dfp/fundamentals#android)


# よくある質問
---

## 広告コードを追加したが、広告が表示されない
以下の項目を確認してください:

* モバイル端末のブラウザでウェブサイトを開いてください。
* まずブラウザのキャッシュをクリアし、クッキーを削除してから改めてウェブサイトに接続します。

## やはり解決できない場合
debugモードを開いて改めてウェブサイトに接続し、先頭に"Vpadn-"のあるメッセージを受信して Vpon FAE へ連絡してください。 [Vpon FAE]



[Here]: https://www.google.com/dfp/
[MobileDPF_Eng]: {{site.imgurl}}/MobileDPF_Eng.png
[AddTargeting_jp.png]: {{site.imgurl}}/AddTargeting_jp.png
[Moblie_DFP_creative_jp]: {{site.imgurl}}/Moblie_DFP_creative_jp.png
[MobileDFP_creativeSetting]: {{site.imgurl}}/MobileDFP_creativeSetting.png
[DFP_WEB_CALLBACK]: {{site.imgurl}}/DFP_WEB_CALLBACK.png
[Vpon FAE]: mailto:fae@vpon.com
