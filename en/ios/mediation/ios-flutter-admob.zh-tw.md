---
layout:         "ios"
title:          "Android / iOS - AdMob"
lead:           "This instruciton is applicable for Flutter developer."
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/mediation/flutter-admob/
lang:           "en"
---
# Overview
---
This instruction is for Flutter publisher to integrate Vpon SDK. Please follow the steps below to integrate Vpon SDK via AdMob Mediation.

# Integration
---
Please follow the integration guide below to add `Vpon SDK` and `Vpon AdMob Adapate` to your project.

* [Android Integration Guide]
* [iOS Integration Guide]


## Add Required Plugins
Please add required plugins in your `pubspec.yaml` as below:

```yaml
cloud_firestore: ^0.8.2+3
firebase_admob: ^0.7.0
```

<img src="{{site.imgurl}}/Flutter-admob_01.png" alt="" class=""/>

## Setup Firebase Configuration
Please create a project for both Android and iOS in Firebase and import the configuration file into your Flutter project.

### Android
Please download Firebase configuration file (`google-services.json`) for Andoird and import into your flutter project.

<img src="{{site.imgurl}}/Flutter-admob_02.png" alt="" class=""/>

### iOS
Please download Firebase configuration file (`GoogleService-Info.plist`) for iOS and import into your flutter project.

<img src="{{site.imgurl}}/Flutter-admob_03.png" alt="" class=""/>

Then you have to add the code snippet below to enable Firebase setting:

```swift
FirebaseApp.configure()
```

## Setup App ID
Please finish the application and ad unit setting in [AdMob] and get your own App ID and AdUnit ID. Add the App ID to your AndroidManifest.xml as below:

```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-################~##########"/>
```

Then you must add App IDs for Android and iOS in your main.dart:

```dart
if (defaultTargetPlatform == TargetPlatform.iOS) {
    FirebaseAdMob.instance.initialize(appId: '');
  } else if (defaultTargetPlatform == TargetPlatform.android)  {
    FirebaseAdMob.instance.initialize(appId: '');
  }
```

## Load And Show Ad

### Setup AdUnit ID
Please setup AdUnit ID for different platform and ad type.

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

### Initialize Banner Ad
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

### Initialize Interstitial Ad

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

### Show Ad
Please call show() to show ad after ad initialization.

```dart
showBanner() {
    bannerAd.show(anchorOffset: 0.0, anchorType: AnchorType.bottom);
    // Show Banner Ad
  }

showInterstitial() {
    interstitialAd.show(anchorOffset: 0.0, anchorType: AnchorType.bottom);
    // Show Interstitial Ad
  }
```

### Dispose Interstitial Ad

```dart
interstitialAd.dispose();
```

# Tips
---

### Reference
* [Flutter AdMob Plugin Integration Guide]

### Sample Code
Please refer to our [Sample Code] for a complete integration sample.


[iOS Integration Guide]:http://wiki.vpon.com/ios/integration-guide/
[Android Integration Guide]:http://wiki.vpon.com/android/integration-guide/
[AdMob]: https://apps.admob.com/
[Sample Code]: https://github.com/vpon-sdk/Vpon-mobile-ios-examples/tree/master/Mediation/flutterexample
[Flutter AdMob Plugin Integration Guide]: https://pub.dartlang.org/packages/firebase_admob