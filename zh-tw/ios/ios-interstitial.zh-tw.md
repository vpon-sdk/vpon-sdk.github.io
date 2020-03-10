---
layout: "ios"
title: "iOS - 插頁廣告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/interstitial/
lang: "zh-tw"
---

# 總覽
---
插頁式廣告是互動式多媒體 HTML5 或「網路應用程式」，在應用程式的正常轉換點顯示 (例如啟動、影片播放前或遊戲關卡載入時)。網路應用程式使用上就像在應用程式內瀏覽一樣，只有簡單的關閉按鈕，而沒有任何導覽列，因為導覽配置就包含在內容本身。這類廣告由於內容更豐富、更吸引人，因此製作起來更昂貴，而曝光機會相對有限。

![]({{site.imgurl}}/Interstitial.png)

# 完成串接準備
---
在開始串接廣告之前，請確認您已經將 Vpon SDK 導入您的 Xcode 專案中。若您尚未完成，請先參考[串接說明]完成相關設定。

# 開始撰寫 Interstitial
---
Interstitial Ad 的內容更加豐富精彩，因為它是需要更多不同實例化、載入和顯示步驟的 Object，而不是 View。
不過，它的用法與 Vpadn Banner 非常類似：

1. Import VpadnSDKAdKit
2. 宣告 VpadnInterstitial
3. 初始化 VpadnInterstitial 物件，並指定 License Key
4. 建立 VpadnRequest 物件，並請求廣告
5. 展示廣告
6. 實作 Delegate protocol

建議您在應用程式的 ViewController 內執行上述步驟。

## Import VpadnSDKAdKit 並宣告 VpadnInterstitial
---

### Objective-C

```objc
@import VpadnSDKAdKit;
// Import Vpon SDK

@interface ViewController() <VpadnInterstitialDelegate>
@property (strong, nonatomic) VpadnInterstitial *vpadnInterstitial;

@end
```

## Swift

```swift
import VpadnSDKAdKit
// Import Vpon SDK

class VponSdkInterstitialViewController: UIViewController {
    var vpadnInterstitial : VpadnInterstitial!
}
```

## 初始化 VpadnInterstitial 物件
---
請參考以下程式碼初始化插頁廣告，並指定 License Key

### Objective-C

```objc
_vpadnInterstitial = [[VpadnInterstitial alloc] initWithLicenseKey:@"License Key"];
// initWithLicenseKey: Vpon License Key to get ad, please replace with your own one

_vpadnInterstitial.delegate = self;
```

### Swift

```swift
vpadnInterstitial = VpadnInterstitial.init(licenseKey:"License Key")
// licenseKey: Vpon License Key to get ad, please replace with your own one

vpadnInterstitial.delegate = self
```

## 建立 VpadnRequest 物件，並請求廣告
---
在發出廣告請求前，請先建立 VpadnRequest 物件：

### Objective-C

```objc
VpadnAdRequest *request = [[VpadnAdRequest alloc] init];

[request setTestDevices:@[[ASIdentifierManager sharedManager].advertisingIdentifier.UUIDString]];
// Set your test device's IDFA here if you're trying to get Vpon test ad

[_vpadnInterstitial loadRequest:request];
// Start to load ad
```

### Swift

```swift
let request = VpadnAdRequest.init()

request.setTestDevices([ASIdentifierManager.shared().advertisingIdentifier.uuidString])
// Set your test device's IDFA here if you're trying to get Vpon test ad

vpadnInterstitial.load(request)
// start to load ad
```

>**Note**
>
>* 您可以為每種類型的廣告都建立不同的 VpadnRequest 物件，或是在所有的廣告請求中都使用同一個 VpadnRequest 物件
>* 如果您想要指定更多投放條件，請參考[進階設定](../advanced)


## 展示廣告
---
在您完成 Interstitial 廣告初始化設定並拉取廣告後，您需要在廣告請求成功後才能嘗試顯示廣告。最簡單的方式是當 onVpadnInterstitialAdReceived 被觸發時，展示廣告，例如：

### Objective-C

```objc
- (void) onVpadnInterstitialAdReceived:(UIView *)bannerView {
    [self.vpadnInterstitial showFromRootViewController:self];
}
```

### Swift

```swift
func onVpadnInterstitialAdReceived(_ bannerView: UIView!) {
    vpadnInterstitial.show(fromRootViewController: self)
}
```

> **Note**：為了維持良好的使用者體驗，我們建議可先抓取插頁廣告，待特定時機再將其顯示，盡量避免抓取後立即顯示

## 實作 Delegate protocol
---
完成廣告請求後，您可以實作以下函數監聽廣告狀態

### Objective-C

```objc
- (void) onVpadnInterstitialLoaded:(VpadnInterstitial *)interstitial {
    // Invoked if receive Banner Ad successfully
}
- (void) onVpadnInterstitial:(VpadnInterstitial *)interstitial failedToLoad:(NSError *)error {
    // Invoked if received ad fail, check this callback to indicates what type of failure occurred
}
- (void) onVpadnInterstitialWillOpen:(VpadnInterstitial *)interstitial {
    // Invoked if the Interstitial Ad is going to be displayed
}
- (void) onVpadnInterstitialClosed:(VpadnInterstitial *)interstitial {
    // Invoked if the Interstitial Ad was dismissed
}
- (void) onVpadnInterstitialWillLeaveApplication:(VpadnInterstitial *)interstitial {
    // Invoked if user leave the app and the current app was backgrounded
}
- (void) onVpadnInterstitialClicked:(VpadnInterstitial *)interstitial {
    // Invoked if the Banner Ad was clicked
}
```

### Swift

```swift
extension VponSdkInterstitialViewController : VpadnInterstitialDelegate {

    func onVpadnInterstitialLoaded(_ interstitial: VpadnInterstitial) {
        // Invoked if receive Banner Ad successfully
    }
    func onVpadnInterstitial(_ interstitial: VpadnInterstitial, failedToLoad error: Error) {
        // Invoked if received ad fail, check this callback to indicates what type of failure occurred
    }
    func onVpadnInterstitialWillOpen(_ interstitial: VpadnInterstitial) {
        // Invoked if the Interstitial Ad is going to be displayed
    }
    func onVpadnInterstitialClosed(_ interstitial: VpadnInterstitial) {
        // Invoked if the Interstitial Ad was dismissed
    }
    func onVpadnInterstitialWillLeaveApplication(_ interstitial: VpadnInterstitial) {
        // Invoked if user leave the app and the current app was backgrounded
    }
    func onVpadnInterstitialClicked(_ interstitial: VpadnInterstitial) {
        // Invoked if the Banner Ad was clicked
    }
}
```

# Tips
---

### Sample Code
如果您想看到完整的串接實例，請參考我們的 [Sample Code]

### 適用於 Vpon SDK v4.9 的串接方法
如果您想了解 Vpon SDK v4.9.4 或以下版本的串接方法，請參考[插頁廣告](../interstitial-under5)


[串接說明]: ../integration-guide/
[Sample Code]: ../download/
[iOS9 ATS]: {{site.baseurl}}/zh-tw/ios/latest-news/ios9ats/
[進階設定]: ../advanced/