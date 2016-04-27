---
layout:         "android"
title:          "Android - バナー広告"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       jp/android/banner/
lang:            "jp"
---
## 実装ガイドを終了いたします
---
まだ以前の実装ガイドを終了していない場合は、[ここから全設定](../integration-guide)をご確認ください。


# バナー広告を表示させるためのコーディング
---
Android アプリは、View オブジェクトで構成され、つまりテキストエリアとボタン等のコントロールの形でユーザに表示され る Java インスタンスです。VpadnBanner はユーザーのタップ操作に反応して HTML5 の小さな広告を表示するもう 1 つ の View のサブクラスです。
全ての View と同じように、AdView もコードだけで作成できます。また、大部分は XML でも作成できます。
バナーを追加するには、次の 5 つのコードが必要です。

1. `com.vpadn.ads.*をインポートする`
2. VpadnBanner インスタンスを宣言する
3. BannerId、つまり Vpon を申請する BannerId を指定してインスタンスを作成する
4. ビューをユーザインターフェースに追加する
5. 広告を通じてインスタンスを読み込む
6. これらすべての処理を最も簡単に実行できるのはアプリの Activity 内です。

```java
import com.vpadn.ads.*
public class MainActivity extends Activity {
  	private RelativeLayout adBannerLayout;
  	private VpadnBanner vponBanner = null;
  	//TODO: Vpon プロパティID
  	private String bannerId = "xxxxxxxxxxxxxxxx";

         @Override
  	protected void onCreate(Bundle savedInstanceState) {
  		super.onCreate(savedInstanceState);
  		setContentView(R.layout.activity_main);
  		//バナーのレイアウトを設定
  		adBannerLayout = (RelativeLayout) findViewById(R.id.adLayout);
  		//VpadnBannerインスタンスの作成
                  vponBanner = new VpadnBanner(this, bannerId, VpadnAdSize.SMART_BANNER, "TW");
  		VpadnAdRequest adRequest = new VpadnAdRequest();
  		//自動リフレッシュでバナーをリクエストできるよう設定する
  		adRequest.setEnableAutoRefresh(true);
                   //バナーを取得開始する
  		vpadnBanner.loadAd(adRequest);
                    //レイアウト上にバナーを設定する
  		adBannerLayout.addView(vponBanner);
  	}

  	@Override
  	protected void onDestroy() {
  		super.onDestroy();
  		if (vponBanner != null) {
  			/バナーを表示する準備ができたら、必ずdestroy を呼び出す
  			vponBanner.destroy();
  			vponBanner = null;
  		}
  	}
}
```
  <br>

# XMLでバナーを表示する
---
直接XMLでバナーを定義することができます。この場合、Java codeを作成する必要はありません。


``` xml
  <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:vpadn="http://schemas.android.com/apk/lib/com.vpadn.ads"
      android:id="@+id/mainLayout"
      android:layout_width="fill_parent"
      android:layout_height="fill_parent"
      android:orientation="vertical" >

  <RelativeLayout
          android:id="@+id/adLayout"
          android:layout_width="fill_parent"
          android:layout_height="wrap_content" >

          <com.vpadn.ads.VpadnBanner
              android:id="@+id/vpadnBannerXML"
              android:layout_width="wrap_content"
              android:layout_height="wrap_content"
              vpadn:adSize="SMART_BANNER"
              vpadn:autoFresh="true"
              vpadn:bannerId= CHANGE_ME
              vpadn:loadAdOnCreate="true"
              vpadn:platform="TW" />
      </RelativeLayout>
  </LinearLayout>
```
<br>
上記の vpon:bannerId=に実際のプロパティID を記入することを忘れないでください。
プロパティID がまだ審査を完了していない場合、以下の方法でテスト広告を取得することができます。

<br>

```java
      VpadnAdRequest adRequest =  new VpadnAdRequest();
      HashSet<String> testDeviceImeiSet = new HashSet<String>();
      testDeviceImeiSet.add("your device advertising id");
      //TODO: テスト用端末のAdvertising IDを入力
      adRequest.setTestDevices(testDeviceImeiSet);
      vponBanner.loadAd(adRequest);
```  
以下のコードで端末の Advertising IDを取得することができます。

1. Eclipse上のログから"advertising_id"を検索する
2. 端末を直接操作する：Google設定 ＞広告＞ この端末の広告ID


# バナー広告のサイズ
---
スマートフォン用の 320x50 以外に、タブレット向けの広告サイズもサポート しています。

|    サイズ (幅 x 高さ)       |       説明      |  VponAdSize 定数値             |
  :------------------------: | :-------------:| :-----------------------------:
  320x50                     |標準のバナー広告| VpadnAdSize.BANNER
  468x60                     |IAB フルサイズバナー広告| VpadnAdSize.IAB\_BANNER
  728x90                     |IAB ビッグバナー広告|  VpadnAdSize.IAB\_LEADERBOARD
  device width x auto height | Smart Banner    |  VpadnAdSize.SMART\_BANNER

  特定のニーズがない場合、Smart banner の使用で十分です (現在、 VpadnAdSize.IAB_WIDE_SKYSCRAPER はサポートしていません)


# 広告のリフレッシュ
----
以下のサンプルコードを使用するとバナーの自動リフレッシュがオンとなります。

  ```java
   VpadnAdRequest adRequest = new VpadnAdRequest();
   //true に設定すると、自動リフレッシュが可能
   adRequest.setEnableAutoRefresh(true);
   adShowBanner.loadAd(adRequest);
  ```


# サンプルコードのダウンロード
---
[Go to download page]
<br>

# 結果
---
実行すると、ディスプレイ上部にバナーが表示されます。
<img class="width-400" src="{{site.imgurl}}/A-sdk330-03.png" alt="successful result example">

# ヒント
---
より詳細な情報は[ンタースティシャル広告](../interstitial)、[メディエーション](../mediation)、[詳細設定](../advanced)をご確認 ください。


[Go to download page]: ../../android/download/
