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
請求 Interstitial Ad 並展示需經過以下步驟：

1. Import VpadnSDKAdKit
2. 宣告 VponInterstitialAd
3. 建立 VpadnRequest 物件
4. 使用 VponInterstitialAd 靜態方法請求廣告
5. 展示廣告
6. 實作 Delegate protocol

建議您在應用程式的 ViewController 內執行上述步驟。

## Import VpadnSDKAdKit 並宣告 VponInterstitialAd
---

### Objective-C

```objc
// Import Vpon SDK
@import VpadnSDKAdKit;

@interface ViewController() <VponFullScreenContentDelegate>
@property (strong, nonatomic) VponInterstitialAd *vponInterstitial;

@end
```

## Swift

```swift
// Import Vpon SDK
import VpadnSDKAdKit

class VponSdkInterstitialViewController: UIViewController {
    var interstitialAd: VponInterstitialAd?
}
```


## 建立 VpadnRequest 物件
---
在發出廣告請求前，請先建立 VpadnRequest 物件：

### Objective-C

```objc
VponAdRequest *request = [[VponAdRequest alloc] init];

// Set your test device's IDFA here if you're trying to get Vpon test ad
[VponAdRequestConfiguration.shared setTestDeviceIdentifiers:@[[ASIdentifierManager sharedManager].advertisingIdentifier.UUIDString]];
```

### Swift

```swift
let request = VponAdRequest()

// Set your test device's IDFA here if you're trying to get Vpon test ad
VponAdRequestConfiguration.shared.testDeviceIdentifiers = ([ASIdentifierManager.shared().advertisingIdentifier.uuidString])
```

>**Note**
>
>* 您可以為每種類型的廣告都建立不同的 VponAdRequest 物件，或是在所有的廣告請求中都使用同一個 VponAdRequest 物件
>* 如果您想要指定更多投放條件，請參考[進階設定](../advanced)

## 使用 VponInterstitialAd 靜態方法請求廣告
---

準備好 License key 和 VponAdRequest 物件後，呼叫 `VponInterstitialAd` 的靜態方法（static func） `load` 發出廣告請求。

待請求完畢，在 completion callback 處理請求成功的 `VponInterstitialAd` 物件與請求失敗的 error。範例如下：

### Objective-C

```objc
[VponInterstitialAd loadWithLicenseKey:@"License Key"
					request:request
					completion:^(VponInterstitialAd *interstitial, NSError *error){
	if (error != nil) {
		NSLog(@"Failed to load ad with error: %@", error.localizedDescription);
		return;
	}
	self.interstitial = interstitial;
	self.interstitial.delegate = self;
}];
```

### Swift

```swift
VponInterstitialAd.load(licenseKey: "License Key", request: request) { [weak self] (ad, error) in
	if let error {
		print("Failed to load ad with error: \(error.localizedDescription)")
		return
	}
	if let ad {
		self?.interstitial = ad
		self?.interstitial?.delegate = self
	}
}
```

## 展示廣告
---
成功請求 Interstitial 廣告後，在您的 view controller 呼叫 `VponInterstitialAd` 物件的 `present(fromRootViewController: UIViewController)` 方法來展示廣告：

### Objective-C

```objc
if (_interstitial != nil) {
	[_interstitial presentFromRootViewController:self];
}
```

### Swift

```swift
if let interstitial {
	interstitial.present(fromRootViewController: self)
}
```

> **Note**：為了維持良好的使用者體驗，我們建議可先抓取插頁廣告，待特定時機再將其顯示，盡量避免抓取後立即顯示

## 實作 Delegate protocol
---
完成廣告請求後，您可以設定 `VponInterstitialAd` 的 `delegate` 屬性，並實作 `VponFullScreenContentDelegate` 方法監聽廣告狀態

### Objective-C

```objc
[VponInterstitialAd loadWithLicenseKey:@"License Key"
							   request:request
							completion:^(VponInterstitialAd *interstitial, NSError *error) {
	self.interstitial = interstitial;
	self.interstitial.delegate = self;
}];

// MARK: - VponFullScreenContentDelegate
- (void)adWillPresentScreen:(id<VponFullScreenContentAd>)ad {
	// Ad will present full screen content
}

- (void)ad:(id<VponFullScreenContentAd>)ad didFailToPresentFullScreenContentWithError:(NSError *)error {
	// Ad did fail to present full screen content
}

- (void)adWillDismissScreen:(id<VponFullScreenContentAd>)ad {
	// Ad will dismiss full screen content
}

- (void)adDidDismissScreen:(id<VponFullScreenContentAd>)ad {
	// Ad did dismiss full screen content
}

- (void)adDidRecordImpression:(id<VponFullScreenContentAd>)ad {
	// Ad did record an impression
}

- (void)adDidRecordClick:(id<VponFullScreenContentAd>)ad {
	// Ad did record a click
}
```

### Swift

```swift
VponInterstitialAd.load(licenseKey: "License Key", request: request) { [weak self] (ad, error) in
	self?.interstitial = ad
	self?.interstitial?.delegate = self
}

// MARK: - VponFullScreenContentDelegate
func adWillPresentScreen(_ ad: VponFullScreenContentAd) {
	// Ad will present full screen content
}

func ad(_ ad: VponFullScreenContentAd, didFailToPresentFullScreenContentWithError error: Error) {
	// Ad did fail to present full screen content
}

func adWillDismissScreen(_ ad: VponFullScreenContentAd) {
	// Ad will dismiss full screen content
}

func adDidDismissScreen(_ ad: VponFullScreenContentAd) {
	// Ad did dismiss full screen content
}

func adDidRecordImpression(_ ad: VponFullScreenContentAd) {
	// Ad did record an impression
}

func adDidRecordClick(_ ad: VponFullScreenContentAd) {
	// Ad did record a click
}
```

# Tips
---

### 確認廣告曝光是否成功發送
請注意，Vpon SDK 不允許廣告以以下方式呈現，致使廣告在畫面上可能不可見：

* 將 AdView 設為 Hidden
* 將 AdView 的 Alpha 值設為 < 100%
* AdView 被其它 View(s) 遮蓋住

當廣告露出在頁面上並達到曝光標準後，會印出以下的 Log 代表有送出廣告曝光：

```
<VPON> [NOTE] Send impression successfully
```


### Sample Code
如果您想看到完整的串接實例，請參考我們的 [Sample Code]

### 適用於 Vpon SDK v5.6.0 以下版本的串接方法
如果您想了解 Vpon SDK v5.6.0 以下版本的串接方法，請參考[插頁廣告](../interstitial-under560)


[串接說明]: ../integration-guide/
[Sample Code]: ../download/
[iOS9 ATS]: {{site.baseurl}}/zh-tw/ios/latest-news/ios9ats/
[進階設定]: ../advanced/