---
layout: "ios"
title: "iOS - 橫幅廣告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/banner/
lang: "zh-tw"
---
# 概要
---
Vpon 橫幅廣告 (Banner) 是利用畫面的一小部分展示廣告來吸引使用者點擊，廣告被點擊後即可打開全螢幕呈現更豐富的內容，例如網站或應用程式商店網頁。

<!-- <img src="{{site.imgurl}}/IOS-Banner_result.png" alt="" class="width-300"/> -->
<img src="{{site.imgurl}}/iOS_Banner_Sample.png" alt="" class="width-300"/>

# 完成串接準備
---
在開始串接廣告之前，請確認您已經將 Vpon SDK 導入您的 Xcode 專案中。若您尚未完成，請先參考[串接說明]完成相關設定。

# 開始撰寫 Banner
---
iOS 應用程式由 UIView 物件所組成，也就是以文字區域和按鈕等控制項的形式向使用者顯示的 Objective-C 執行個體。VpadnBanner 是一種 UIView 子類別，用來顯示由使用者點擊觸發的小型 HTML5 廣告。

和所有的 UIView 一樣，用程式碼編寫 VpadnBanner 很簡單。以下為所需步驟：

1. Import VpadnSDKAdKit
2. 宣告 VponBannerView
3. 初始化 VponBannerView 物件，並指定 License Key
4. 建立 VponAdRequest 物件，並請求廣告
5. 實作 Delegate protocol

建議您可以在應用程式的 ViewController 內執行上述步驟。

## Import VpadnSDKAdKit 並宣告 VponBannerView
---

### Obejctive-C

```objc
// Import Vpon SDK
@import VpadnSDKAdKit;

@interface ViewController() <VponBannerViewDelegate>
@property (strong, nonatomic) VponBannerView *bannerView;
@property (weak, nonatomic) IBOutlet UIView *loadBannerView;

@end
```

### Swift

```swift
// Import Vpon SDK
import VpadnSDKAdKit

class VponSdkBannerViewController: UIViewController {
	var bannerView: VponBannerView?
	@IBOutlet weak var loadBannerView: UIView!
}
```

## 初始化 VponBannerView 物件
---
請參考以下程式碼初始化橫幅廣告，並指定 License Key


### Objective-C

```objc
// initWithAdSize: The Banner Ad size that will be displayed
_bannerView = [[VponBannerView alloc]initWithAdSize:[VponAdSize banner]];
// licenseKey: Vpon License Key to get ad, please replace with your own one
_bannerView.licenseKey = @"License Key";

// Only available for Banner Ad, will auto refresh ad if set YES
_bannerView.autoRefresh = NO;

_bannerView.rootViewController = self;
_bannerView.delegate = self;
```

### Swift

``` swift
// adSize: The Banner Ad size that will be displayed
bannerView = VponBannerView(adSize: .banner())
// licenseKey: Vpon License Key to get ad, please replace with your own one
bannerView?.licenseKey = "License Key"

// Only available for Banner Ad, will auto refresh ad if set true
bannerView?.autoRefresh = false

bannerView?.rootViewController = self
bannerView?.delegate = self
```


## 建立 VponAdRequest 物件，並請求廣告
---
在發出廣告請求前，請先建立 VpadnRequest 物件：

### Objective-C

```objc
VponAdRequest *request = [[VponAdRequest alloc] init];
// Set your test device's IDFA here if you're trying to get Vpon test ad
VponAdRequestConfiguration *config = VponAdRequestConfiguration.shared;
[config setTestDeviceIdentifiers:@[[ASIdentifierManager sharedManager].advertisingIdentifier.UUIDString]];

// Start to load ad
[_bannerView load: request];
```

### Swift

```swift
let request = VponAdRequest()
// Set your test device's IDFA here if you're trying to get Vpon test ad
VponAdRequestConfiguration.shared.testDeviceIdentifiers = ([ASIdentifierManager.shared().advertisingIdentifier.uuidString])

// Start to load ad
bannerView?.load(request)
```

>**Note**
>
>* 您可以為每種類型的廣告都建立不同的 VponAdRequest 物件，或是在所有的廣告請求中都使用同一個 VpadnRequest 物件
>* 如果您想要指定更多投放條件，請參考[進階設定](../advanced)



## 實作 Delegate protocol
---
完成廣告請求後，您可以實作以下函數監聽廣告狀態：

### Objective-C

```objc
- (void)bannerViewDidReceiveAd:(VponBannerView *)bannerView {
	// Invoked if receive Banner Ad successfully
	// Add ad view to your layout
	bannerView.translatesAutoresizingMaskIntoConstraints = NO;
	[self.loadBannerView addSubview:bannerView];
	[NSLayoutConstraint activateConstraints:@[
		[bannerView.centerXAnchor constraintEqualToAnchor: _loadBannerView.centerXAnchor],
		[bannerView.centerYAnchor constraintEqualToAnchor: _loadBannerView.centerYAnchor]
	]];
}

- (void)bannerView:(VponBannerView *)bannerView didFailToReceiveAdWithError:(NSError *)error {
	// Invoked if received ad fail, check this callback to indicates what type of failure occurred
}

- (void)bannerViewDidRecordImpression:(VponBannerView *)bannerView {
	// Invoked if an impression has been recorded for an ad.
}

- (void)bannerViewDidRecordClick:(VponBannerView *)bannerView {
	// Invoked if an click has been recorded for an ad.
}
```

### Swift

```swift
func bannerViewDidReceiveAd(_ bannerView: VponBannerView) {
	// Invoked if receive Banner Ad successfully
	// Add ad view to your layout
	bannerView.translatesAutoresizingMaskIntoConstraints = false
	loadBannerView.addSubview(bannerView)
	NSLayoutConstraint.activate([
		bannerView.centerXAnchor.constraint(equalTo: loadBannerView.centerXAnchor),
		bannerView.centerYAnchor.constraint(equalTo: loadBannerView.centerYAnchor)
	])
}

func bannerView(_ bannerView: VponBannerView, didFailToReceiveAdWithError error: Error) {
	// Invoked if received ad fail, check this callback to indicates what type of failure occurred
}

func bannerViewDidRecordImpression(_ bannerView: VponBannerView) {
	// Invoked if an impression has been recorded for an ad.
}

func bannerViewDidRecordClick(_ bannerView: VponBannerView) {
	// Invoked if an click has been recorded for an ad.
}
```

# 橫幅廣告尺吋
---
除了標準尺吋 (320x50) 的橫幅廣告外，Vpon 還支援多種不同尺吋的橫幅廣告：

尺吋<br>(寬x高)             |     說明       |  VponAdSize 常數值              | 適用裝置
:------------------------: | :-------------:| :-----------------------------:|:-----------:
320x50                     | 標準橫幅廣告     | VpadnAdSizeBANNER              |iPhone<br>iPad
468x60                     | IAB 全橫幅廣告   | VpadnAdSizeFullBanner          |iPad
728x90                     | IAB 超級橫幅廣告 | VpadnAdSizeLeaderboard         |iPad
300x250                    | IAB 中矩形廣告   | VpadnAdSizeMediumRectangle     |iPhone<br>iPad
320x480                    | 大型橫幅廣告     | VpadnAdSizeLargeRectangle      |iPhone<br>iPad

此外，也可使用 VponAdSize 的類別方法（class method）創建想要的尺寸，作為 init `VponBannerView` 的參數，例如：

### Objective-C

```objc
_bannerView = [[VponBannerView alloc] initWithAdSize:[VponAdSize mediumRectangle]];
```

### Swift

```swift
bannerView = VponBannerView(adSize: .mediumRectangle())
```


<!-- 320x100                    | 大型橫幅廣告     | VpadnAdSizeLARGEBANNER         |iPhone<br>iPad -->

# Tips
---

### 確認廣告曝光是否成功發送
請注意，Vpon SDK 不允許廣告以以下方式呈現，致使廣告在畫面上可能不可見：

* 將 AdView 設為 Hidden
* 將 AdView 的 Alpha 值設為 < 1.0
* AdView 被其它 View(s) 遮蓋住

當廣告露出在頁面上並達到曝光標準後，會印出以下的 Log 代表有送出廣告曝光：

```
<VPON> [NOTE] Send impression successfully
```


### Sample Code
如果您想看到完整的串接實例，請參考我們的 [Sample Code]

### 適用於 Vpon SDK v5.6.0 以下版本的串接方法
如果您想了解 Vpon SDK v5.6.0 以下版本的串接方法，請參考[橫幅廣告](../banner-under560)

[串接說明]: ../integration-guide/
[Sample Code]: ../download/
[iOS9 ATS]: {{site.baseurl}}/zh-tw/ios/latest-news/ios9ats/