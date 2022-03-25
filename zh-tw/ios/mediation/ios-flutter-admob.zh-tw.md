---
layout:         "ios"
title:          "Android / iOS 中介服務 - AdMob"
lead:           "僅適用於 Flutter 開發者"
description:
keywords:       'Keywords for this page, in the meta data'
permalink:      /zh-tw/ios/mediation/flutter-admob/
lang:           "zh-tw"
---
# 概要
---
本篇說明提供 Flutter 開發者串接 Vpon SDK 的建議作法，請參考以下說明，利用 AdMob Mediation 的方式，完成 Vpon SDK 的串接。

# 開始串接
---
在開始進行設定之前，請先參考以下串接說明，將 `Vpon SDK` 及 `Vpon AdMob Adapter` 加到您的專案中。

* [Android 串接說明]
* [iOS 串接說明]


## 加入所需 Plugin
請開啟您的 Flutter 專案中的 `pubspec.yaml`，並加入所需的 Plugin。

```yaml
cloud_firestore: ^0.8.2+3
firebase_admob: ^0.7.0
```

<img src="{{site.imgurl}}/Flutter-admob_01.png" alt="" class=""/>

## 啟用並完成 Firebase 配置
請先在您的 Firebase 帳號中分別申請一個 Android 及一個 iOS 的專案，並將 Firebase 的配置檔案加到 Flutter 專案中。

### Android
請從 Firebase 後台下載 Android 專用的 Firebase 配置檔案 `google-services.json`，並加入 Flutter 專案中。

<img src="{{site.imgurl}}/Flutter-admob_02.png" alt="" class=""/>

### iOS
請從 Firebase 後台下載 iOS 專用的 Firebase 配置檔案 `GoogleService-Info.plist`，並加入 Flutter 專案中。

<img src="{{site.imgurl}}/Flutter-admob_03.png" alt="" class=""/>

再在您的 AppDelegate 中新增以下程式片段啟動 Firebase：

```swift
FirebaseApp.configure()
```

## 設定 App ID

請先在 [AdMob 後台] 完成應用程式及廣告單元的設定，並取得您專屬的 App ID 及 AdUnit ID。將 App ID 加到您的 AndroidManifest.xml 中：

```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-################~##########"/>
```

再在您的 main.dart 中加入以下程式片段，請務必為您的 Android 及 iOS 專案分別新增對應的 App ID：

```dart
if (defaultTargetPlatform == TargetPlatform.iOS) {
    FirebaseAdMob.instance.initialize(appId: '');
  } else if (defaultTargetPlatform == TargetPlatform.android)  {
    FirebaseAdMob.instance.initialize(appId: '');
  }
```

## 拉取並展示廣告

### 指定 AdUnit ID
請務必為您的 Android 及 iOS 專案分別新增對應不同廣告類型的 AdUnit ID：

```dart
var adUnitId = '';
if (defaultTargetPlatform == TargetPlatform.iOS) {
  adUnitId = '';
  // Insert AdUnit ID for iOS here
} else if (defaultTargetPlatform == TargetPlatform.android)  {
  adUnitId = '';
  // Insert AdUnit ID for Android here
}
```

### 初始化橫幅廣告
```dart
...
BannerAd bannerAd;

bannerAd = BannerAd(
        adUnitId: adUnitId,
        size: AdSize.banner,
        listener: (event) {
          switch (event) {
            case MobileAdEvent.loaded:
              showBanner();
              break;
            default:
              print('banner event is $event');
              break;
          }
        });
    bannerAd.load();
...
```

### 初始化插頁廣告

```dart
...
InterstitialAd interstitialAd;

interstitialAd = InterstitialAd(
      adUnitId: adUnitId,
      listener: (MobileAdEvent event) {
        switch (event) {
          case MobileAdEvent.loaded:
            showInterstitial();
            break;
          case MobileAdEvent.closed:
            disposeInterstitial();
            break;
          default:
            print("InterstitialAd event is $event");
            break;
        }
      },
    );
    interstitialAd.load();
...
```

### 展示廣告
完成廣告初始化後，請呼叫 show() 來展示廣告。

```dart
showBanner() {
    bannerAd.show(anchorOffset: 0.0, anchorType: AnchorType.bottom);
    // Show Banner Ad
  }

showInterstitial() {
    interstitialAd.show(anchorOffset: 0.0, anchorType: AnchorType.bottom);
    // Show Interstitial Ad
  }
```

### 清除插頁廣告

```dart
interstitialAd.dispose();
```

# Tips
---

### 參考資訊
* [Flutter AdMob Plugin Integration Guide]

### Sample Code
Vpon 提供了一個 Flutter 串接 Vpon SDK 的範例，請參考我們的 [Sample Code]


[iOS 串接說明]:http://wiki.vpon.com/zh-tw/ios/integration-guide/
[Android 串接說明]:http://wiki.vpon.com/zh-tw/android/integration-guide/
[AdMob 後台]: https://apps.admob.com/
[Sample Code]: https://github.com/vpon-sdk/Vpon-mobile-ios-examples/tree/master/Mediation/flutterexample
[Flutter AdMob Plugin Integration Guide]: https://pub.dartlang.org/packages/firebase_admob