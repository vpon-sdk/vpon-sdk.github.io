---
layout:         "android"
title:          "Android - 詳細設定"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       jp/android/advanced/
lang:            "jp"
---
# VpadnAdRequest
---
  Vponにより正確なターティングをさせるために、VpadnBanner.loadAd に渡す前に、 VpadnAdRequest をカスタマイズすることが可能です。

## デバイスに広告を割り当てる

これらのプロパティでテスト広告を表示させる端末、もしくは端末セットを指定することができます。
開発中に不要な広告を表示させないためにこのプロパティをご利用ください。
SDKが正しく実装されていることを確認するには、テスト用端末を追加し、アプリを起動させ、表示されたテスト広告をクリックします。

```Java
  VpadnAdRequest request = new VpadnAdRequest();
  request.addTestDevice("your test device advertising id");
  //TODO テスト用端末のAdvertising IDを記入する。
```

## ターゲティング

位置情報とユーザー属性情報を指定することができます。ユーザーのプライバシー情報保護の観点から、アプリ内の既存情報としての位置情報とユーザー属性情報を指定してください。

```Java
VpadnAdRequest request = new VpadnAdRequest();
request.setGender(VpadnAdRequest.Gender.FEMALE);
request.setBirthday("1977-08-23");
```
ユーザーの[位置情報](http://developer.android.com/reference/android/location/Location.html)は適切な情報で[取得可能](http://developer.android.com/guide/topics/location/strategies.html)です。 システムは、適切な方法でユーザの位置を入手できます。


# VpadnAdListener
---
`VpadnBanner.setAdListener` に渡すオブジェクト内に `com.vpadn.ads.VpadnAdListener` をオプションで実装することで、広告リクエストの失敗やクリックスルーなどのライフサイクルイベントをトラッキングすることができます。

```java
   public interface VpadnAdListener {
     void onVpadnReceiveAd(VpadnAd ad);
     void onVpadnFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode errorCode);
     void onVpadnPresentScreen(VpadnAd ad);
     void onVpadnDismissScreen(VpadnAd ad);
     void onVpadnLeaveApplication(VpadnAd ad);
   }
```

このインターフェースは、アクティビティー或いはその他のオブジェクトが実行できます。

```java
import com.vpadn.ads.*;
public class VpadnBannerExample extends Activity implements VpadnAdListener {
  //TODO: Implements all interface methods }
}
```

そして `VpadnBanner` に渡します。

```java
 vponBanner.setAdListener(this);
```

`public void onVpadnReceiveAd(VpadnAd ad)`
  VpadnBanner.loadAd が成功した場合に渡します。
`public void onFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode error)`
  loadAd が失敗した場合に渡します。一般的には、ネットワーク・アプリの設定ミス・広告在庫の不足が考えられます。デバッグ用にこれらのイベントを記録しておくことをお奨めします。

```java
 @Override public void onFailedToReceiveAd(VpadnAd ad, VpadnAdRequest.VpadnErrorCode errorCode) { Log.d(MY_LOG_TAG, "failed to receive ad (" + errorCode + ")"); }
```

`public void onVpadnPresentScreen(VpadnAd ad)`
ユーザーが広告をクリックし、アプリ上でフルスクリーン広告のユーザーインターフェースが表示される時に呼び出されます。

`public void onVpadnDismissScreen(VpadnAd ad)`
ユーザーが onPresentScreen と一緒に表示されるフルスクリーンアクティビティを閉じ、制御権がアプリに返された時に呼び出す。

`public void onVpadnLeaveApplication(VpadnAd ad)`
新しいアプリケーションを起動したときに広告のクリックを呼び出します。



# Crazy Ad
---
バナーがディスプレイ全体にエキスパンドし、5-7秒後に自動的に閉じます。
<img src="{{site.imgurl}}/Crazyad.png" alt="" class="img-300" />


## Setting
---
管理画面にてCrazy ADを配信するかどうかを選択します。

http://cn.pub.vpon.com/ 中国エリアのプロパティIDを登録

http://tw.pub.vpon.com/ 台湾エリアのプロパティIDを登録

図:
![CrazyadSetting_JP]


# Proguard Configuration
---
APP 自体が proguard の難読化を経る必要がある場合、次の設定を追加してください。<br>
-dontwarn c.\*\* <br>
-dontwarn com.vpon.\*\* <br>
-dontwarn vpadn.\*\* <br>
-keep class c.\*\*{ \*; } <br>
-keep class com.vpon.\*\* { \*; } <br>
-keep class vpon.\*\* { \*; } <br>
-keep class com.vpadn.\*\* { \*; } <br>
-keep class vpadn.\*\* { \*; } <br>


# Corona User
---
App を Corona で Vpon 広告に連結しようとする場合、web SDK の方式で連結するようお勧めま す。使用方法は、以下の通りとします。
web SDK 内の html を local file に書き込んでから webview にこの file を load させます (例: webView:request( "localfile.html", system.ResourceDirectory ))。

html コンテンツは、vpon wiki の web SDK 操作マニュアル: [Web SDK をご覧ください]
詳細な Corona SDK ドキュメントは Corona Document: [をご覧ください]




[CrazyadSetting_JP]: {{site.imgurl}}/CrazyadSetting_JP.png
[Web SDK をご覧ください]: {{site.baseurl}}/jp/web/
[をご覧ください]: http://docs.coronalabs.com/api/library/native/newWebView.html
