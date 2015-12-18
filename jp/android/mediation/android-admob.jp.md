---
layout:         "android"
title:          "Android - AdMob"
lead:           "Android メディエーション"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       jp/android/mediation/admob/
lang:            "jp"
---
# Google AdMob mediation
--------
Google AdMob mediation は[こちら]をご覧ください。

# Google Ad Network Mediation
-----

1. 番号付きのリストアイテム。
ログイン - [AdMob account][0]
![1]


2. `収益` ->`新アプリケーションによる収益化 `
![][2]

3. アプリケーションの選択: <br>
(1) app name の記入。<br>
(2) プラットフォームの選択。<br>
(3)「アプリケーションの追加」をクリック。 <br>
![][3]

4. 広告フォームの選択と広告ユニットの命名: <br>
(1) バナー広告またはインターステイシャル広告の選択。 <br>
(2) 設定。 <br>
(3) 広告ユニット名(例:Vpon_Banner)。 <br>
(4) 保存<br>
![][4]

5. 一組の広告ユニット番号を取得し、選択が完了。
![][5]

6. 仲介サービスの編集
![][6]

7. 広告放送ネットワークの追加
![][7]

8. Vponをメディエーションリストに設定する：    <br>
(1) Vponネットワークタグを利用可能な広告ネットワークで検索  <br>
(2) Vpon広告ID：Vponのバックオフィスから取得したVponバナーIDを入力  <br>
(3) 地域：Vponプラットフォームからリクエストしたい地域を選択する  <br>

(あなたのアプリのユーザーが中国から利用している場合は、この列に`cn`と入力し、それ以外は`tw`と入力します)

![][8]


# Vpon広告ネットワークをあなたのプロジェクトに統合する
You just need to import two jars into lib folder of your project, which are `admob-adapter-****.jar` and `vpadn-sdk-***-***-***.jar`.
![][9]



# Requirement
-----
1. 最新版の Android SDK latest copy of the Android SDK がインストール済みで、また少なくとも Android v3.2 (target in project.properties to android-13)でコンパイルすることをご確認ください。
2. Google Mobile Ads SDK は、Android 2.3 以上のバージョン( AndroidManifest.xml で android:minSdkVersion を最低でも 9 に設定します)で実行可能です。

# SDK の導入
---
以下のステップで Google Mobile Ads SDK を App 内に導入します。

1. Google Play Services library を Eclipse workspace に追加と reference します。
2. AndroidManifest.xml に meta-data tag を追加します。
3. AndroidManifest で com.google.android.gms.ads.AdActivity を宣言します。
4. Manifest で permissions を設定します。

## Google Play Services library を追加、reference
まず Google Play Service SDK: [instructions] をインストールして設定してください。


### Eclipse
---
a. アプリケーションプログラムプロジェクト内で右ボタンを押して`プロパティ`を選びます。

![][10]

b. Android を選択し-> Add..google-play-services_lib 内容を検索した後、OK を押して Google Play services library を追加し ます。

![][11]

c. 図に示されるように、プロジェクトに Google Play services library が refernce されたことがわかります。

![][12]

### Android Studio
---
1. Open `build.gradle` under `app`.
> **Note**: There are two `build.gradle`s in Android Studio.

2. Add build rule in dependencies to getch latest `play-services`.

```groovy
apply plugin: 'com.android.application'
    ...

    dependencies {
      compile 'com.google.android.gms:play-services:+'
    }
```
Then, save and go to toolbar for **Sync Project with Gradle Files**

## AndroidManifest.xml に meta-data tag を追加
Google Play Service は、AndroidManifest.xml に以下の設定を追加する必要があります。

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.company"
          android:versionCode="1" android:versionName="1.0">
 <application android:icon="@drawable/icon" android:label="@string/app_name"
               android:debuggable="true">
  <span style="color:#ff0000"><meta-data android:name="com.google.android.gms.version"
             android:value="@integer/google_play_services_version"/></span>
   <activity android:label="@string/app_name" android:name="BannerExample">
     <intent-filter>
       <action android:name="android.intent.action.MAIN"/>
       <category android:name="android.intent.category.LAUNCHER"/>
     </intent-filter>
   </activity>
 </application>
</manifest>
```

## AdActivity を宣言
---
Mobile Ads SDK は、AndroidManifest.xml で com.google.android.gms.ads.AdActivity を宣言する必要があります。
```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.company"
          android:versionCode="1" android:versionName="1.0">
 <application android:icon="@drawable/icon" android:label="@string/app_name"
               android:debuggable="true">
   <meta-data android:name="com.google.android.gms.version"
               android:value="@integer/google_play_services_version"/>
   <activity android:label="@string/app_name" android:name="BannerExample">
     <intent-filter>
       <action android:name="android.intent.action.MAIN"/>
       <category android:name="android.intent.category.LAUNCHER"/>
     </intent-filter>
   </activity>
   <span style="color:#ff0000">
     <activity android:name="om.google.android.gms.ads.AdActivity"
       android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|uiMode|screenSize|smallestScreenSize"/></span>
 </application>
</manifest>
```
## Permissions
---
Permission を AndroidManifest.xml に追加します。
ネットワーク機能を有効にして送信するため、ここで`"INTERNET"`が必要となります。
`"ACCESS_NETWORK_STATE"`は、ここを選択とし、ユーザの現在のネットワーク状態を読み取ります。

```xml
 <?xml version="1.0" encoding="utf-8"?>
 <manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.company"
          android:versionCode="1" android:versionName="1.0">
  <application android:icon="@drawable/icon" android:label="@string/app_name"
               android:debuggable="true">
    <meta-data android:name="com.google.android.gms.version"
               android:value="@integer/google_play_services_version"/>
    <activity android:label="@string/app_name" android:name="BannerExample">
      <intent-filter>
        <action android:name="android.intent.action.MAIN"/>
        <category android:name="android.intent.category.LAUNCHER"/>
      </intent-filter>
    </activity>
    <activity android:name="com.google.android.gms.ads.AdActivity"
              android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|uiMode|screenSize|smallestScreenSize"/>
  </application>
  <span style="color:#ff0000"><uses-permission android:name="android.permission.INTERNET"/>
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/></span>
 </manifest>
```

# バナー広告
---
お客様のAndroid appにバナー広告を掲載するには、簡単なcom.google.android.gms.ads.AdViewをお客様の ユーザーインターフェースに追加するだけです。

以下の五つのステップでバナー広告が表示できます:

* `com.google.android.gms.ads.*` をインポート
* AdViewを一つ発表
* ad unit IDを一つ作成し指定
* ユーザーインターフェースにviewを追加

bannerを取得 最も簡単な方法でお客様のActivityにおける全ての手順をおこないます。

```Java
  import com.google.android.gms.ads.*;

  public class BannerExample extends Activity {
  private AdView adView;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.main);

    // Create the adView.
    adView = new AdView(this);
    adView.setAdUnitId(MY_AD_UNIT_ID);
    adView.setAdSize(AdSize.BANNER);

    // Lookup your LinearLayout assuming it's been given
    // the attribute android:id="@+id/mainLayout".
    LinearLayout layout = (LinearLayout)findViewById(R.id.mainLayout);

    // Add the adView to it.
    layout.addView(adView);

    // Initiate a generic request.
    AdRequest adRequest = new AdRequest.Builder().build();

    // Load the adView with the ad request.
    adView.loadAd(adRequest);
  }

  @Override
  public void onPause() {
    adView.pause();
    super.onPause();
  }

  @Override
  public void onResume() {
    super.onResume();
    adView.resume();
  }

  @Override
  public void onDestroy() {
    adView.destroy();
    super.onDestroy();
   }
 }
```
For more about banner: [here][13]

# インターステイシャル広告
---
AdViewの使用方法との類似点

* `com.google.android.gms.ads.*` をインポート
* 物品の発表
* bannerとは異なるAdMob Ad Unit IDを作成し指定

同様に、最も便利な方法でお客様のActivityにおいて以下の手順をおこないます。

```Java
 import com.google.android.gms.ads.*;
 public class BannerExample extends Activity {

  private InterstitialAd interstitial;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.main);

    // Create the interstitial.
    interstitial = new InterstitialAd(this);
    interstitial.setAdUnitId(MY_AD_UNIT_ID);

    // Create ad request.
    AdRequest adRequest = new AdRequest.Builder().build();

    // Begin loading your interstitial.
    interstitial.loadAd(adRequest);

  }
// Invoke displayInterstitial() when you are ready to display an interstitial.
  public void displayInterstitial() {
    if (interstitial.isLoaded()) {
      interstitial.show();
     }
   }
 }
```

# サンプルコードのダウンロード
---
[Download Sample Code]

  [こちら]: https://developers.google.com/admob/android/quick-start
  [0]: http://www.google.com/admob/
  [1]:  {{site.imgurl}}/AdMobScreenshotSiJP1.PNG
  [2]:  {{site.imgurl}}/AdMobScreenshotSiJP2.png
  [3]:  {{site.imgurl}}/AdMobScreenshotSiJP3.png
  [4]:  {{site.imgurl}}/AdMobScreenshotSiJP4.png
  [5]:  {{site.imgurl}}/AdMobScreenshotSiJP5.png
  [6]:  {{site.imgurl}}/AdMobScreenshotSiJP6.PNG
  [7]:  {{site.imgurl}}/AdMobScreenshotSiJP7.png
  [8]:  {{site.imgurl}}/AdMobScreenshotSiJP8.png
  [9]:  {{site.imgurl}}/AdMobLibJarFiles.jpg
  [10]: {{site.imgurl}}/GooglePlay_Properties.png
  [11]: {{site.imgurl}}/GooglePlay_Addlib.png
  [12]: {{site.imgurl}}/GooglePlay_Addlib2.png
  [Download Sample Code]: {{site.baseurl}}/jp/android/download/#admob
  [Android SDK]: https://developer.android.com/sdk/index.html
  [instructions]: https://developer.android.com/google/play-services/setup.html
  [13]: https://developers.google.com/admob/android/banner
