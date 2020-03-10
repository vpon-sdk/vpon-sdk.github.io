---
layout: "ios"
title: "iOS - 開屏廣告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/splash/
lang: "zh-tw"
---

# 概要
--------
在原先等待應用程式開啟的時間，以開屏廣告來作為完美的轉場效果，除了以自然且立即的方式呈現適合的廣告內容以提升使用者體驗，也可在此處結合應用程式商標，讓使用者產生印象並留下深刻記憶。

<img class="width-300" src="{{site.imgurl}}/Splash_iOS.png" alt="successful result example">

# 完成串接準備
---
在開始串接廣告之前，請確認您已經將 Vpon SDK 導入您的 Xcode 專案中。若您尚未完成，請先參考[串接說明]完成相關設定。


## 開始撰寫 Splash
---
在應用程式中建立開屏廣告需要執行以下七個步驟：

1. Import VpadnSDKAdKit
2. 宣告 VpadnSplash
3. 初始化 VpadnSplash 物件，並指定 License Key
4. 設置廣告讀取容忍時間
5. 建立 VpadnRequest 物件，並請求廣告
6. 實作 Delegate protocol


## Import VpadnSDKAdKit 並宣告 VpadnSplash
--------
首先匯入 SDK ，宣告實作了 VpadnSplashDelegate protocol 以接收廣告狀態，並宣告 VpadnSplash 物件與 splashView。

### Objective-C

```objc
@import VpadnSDKAdKit;
// Import Vpon SDK

@interface ViewController () <VpadnSplashDelegate>

@property (weak, nonatomic) IBOutlet UIView *loadSplashView;
@property (strong, nonatomic) VpadnSplash *vpadnSplash;

@end
```

### Swift

```swift
import VpadnSDKAdKit
// Import Vpon SDK

class VponSdkBannerViewController: UIViewController {

@IBOutlet weak var loadSplashView: UIView!
    var vpadnSplash: VpadnSplash!
}
```

## 初始化 VpadnSplash 物件
--------
在 SplashViewController 實作中初始化 vpadnSplash 物件，完成指定 splashID 及 splashView 後即可請求廣告。(尚未申請 splashID 請先參考此[說明] )

### Objective-C

```objc
_vpadnSplash = [[VpadnSplash alloc] initWithLicenseKey:@"License Key" target:_loadSplashView];
// licenseKey: Vpon License Key to get ad, please replace with your own one

_vpadnSplash.delegate = self;
```

### Swift

```swift
vpadnSplash = VpadnSplash.init(licenseKey: "License Key", target: loadSplashView)
// licenseKey: Vpon License Key to get ad, please replace with your own one

vpadnSplash.delegate = self
```

## 設置容忍時間
---
在發出廣告請求之前，藉由 setEndurableSecond 設定最大可容忍的等待時間。

### Objective-C

```objc
[_vpadnSplash setEndurableSecond:3];
```

### Swift

```swift
vpadnSplash.setEndurableSecond(3)
```

>**Note:** 預設等待時間為3秒，若設置為 0 則完全不等待，僅會取用前次請求後 Cache 的廣告。

## 建立 VpadnRequest 物件，並請求廣告
---
在發出廣告請求前，請先建立 VpadnRequest 物件：

### Objective-C

```objc
VpadnAdRequest *request = [[VpadnAdRequest alloc] init];

[request setTestDevices:@[[ASIdentifierManager sharedManager].advertisingIdentifier.UUIDString]];
// Set your test device's IDFA here if you're trying to get Vpon test ad

[_vpadnSplash loadRequest:request];
// Start to load ad
```

### Swift

```swift
let request = VpadnAdRequest.init()

request.setTestDevices([ASIdentifierManager.shared().advertisingIdentifier.uuidString])
// Set your test device's IDFA here if you're trying to get Vpon test ad

vpadnSplash.load(request)
// start to load ad
```

>**Note**
>
>* 您可以為每種類型的廣告都建立不同的 VpadnRequest 物件，或是在所有的廣告請求中都使用同一個 VpadnRequest 物件
>* 如果您想要指定更多投放條件，請參考[進階設定](../advanced)



## 實作 Delegate protocol
---
完成廣告請求後，您可以實作以下函數監聽廣告狀態：

### Objective-C

```objc
- (void)onVpadnSplashReceived:(nonnull VpadnSplash *)vpadnSplash {
    // Invoked if the Splash Ad received and displayed successfully
}
- (void)onVpadnSplash:(nonnull VpadnSplash *)vpadnSplash didFailToReceiveAdWithError:(nullable NSError *)error {
    // Invoked if received ad fail, check this callback to indicates what type of failure occurred
}
- (void)onVpadnSplashAllowToDismiss:(nonnull VpadnSplash *)vpadnSplash {
    // Invoked if the ad is able to be dismissed
}
- (void)onVpadnSplashClicked:(nonnull VpadnSplash *)vpadnSplash {
    // Invoked if the Banner Ad was clicked
}
- (void)onVpadnSplashLeaveApplication:(nonnull VpadnSplash *)vpadnSplash {
    // Invoked if user leave the app and the current app was backgrounded
}
```

### Swift

```swift
extension VponSdkSplashViewController: VpadnSplashDelegate {

    func onVpadnSplashReceived(_ vpadnSplash: VpadnSplash) {
      // Invoked if the Splash Ad received and displayed successfully
    }
    func onVpadnSplash(_ vpadnSplash: VpadnSplash, didFailToReceiveAdWithError error: Error?) {
      // Invoked if received ad fail, check this callback to indicates what type of failure occurred
    }
    func onVpadnSplashAllow(toDismiss vpadnSplash: VpadnSplash) {
      // Invoked if the ad is able to be dismissed  
    }
    func onVpadnSplashClicked(_ vpadnSplash: VpadnSplash) {
      // Invoked if the Banner Ad was clicked
    }
    func onVpadnSplashLeaveApplication(_ vpadnSplash: VpadnSplash) {
      // Invoked if user leave the app and the current app was backgrounded
    }
}
```


# Tips
---

### Sample Code
如果您想看到完整的串接實例，請參考我們的，請參考我們的 [Sample Code]

### 適用於 Vpon SDK v4.9 的串接方法
如果您想了解 Vpon SDK v4.9.1 或以下版本的串接方法，請參考[開屏廣告](../splash-under5)


[串接說明]: ../integration-guide/
[說明]: {{ site.baseurl }}/zh-tw/ios/registration/
[這篇]: {{site.baseurl}}/zh-tw/ios/latest-news/ios9ats/
[Sample Code]: {{ site.baseurl }}/zh-tw/ios/download/
