---
layout: "ios"
title: "iOS - 横幅广告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/banner/
lang: "zh-cn"
---
# 概要
---
Vpon 横幅广告 (banner) 是利用画面的一小部分展示广告来吸引使用者点击，广告被点击后即可打开全萤幕呈现更丰富的浏览内容，例如网站或应用程式商店网页。

<img src="{{site.imgurl}}/iOS_Banner_Sample.png" alt="" class="width-300"/>

# 完成串接准备
---
在开始串接广告之前，请确认您已经将 Vpon SDK 导入您的 Xcode 专案中。若您尚未完成，请先参考[串接说明]完成相关设定。

# 开始撰写 Banner
---
iOS 应用程式由 UIView 物件所组成，也就是以文字区域和按钮等控制项的形式向使用者显示的 Objective-C 执行个体。VponAdRequestView 只是一种 UIView 子类别，用来显示由使用者点击触发的小型 HTML5 广告。

和所有的 UIView 一样，用程式码编写 VpadnBanner 很简单。以下为所需步骤:

1. Import VpadnSDKAdKit
2. 宣告 VponBannerView
3. 初始化 VponBannerView 物件，并指定 License Key
4. 建立 VponAdRequest 物件，并请求广告
5. 实作 Delegate protocol

建议您可以在应用程式的 ViewController 内执行上述所有步骤。

## Import VpadnSDKAdKit 并宣告 VponBannerView
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
请参考以下程式码，初始化横横幅广告，并指定 License Key

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

## 建立 VponAdRequest 物件，并请求广告
---
在发出广告请求前，请先建立 VponAdRequest 物件：

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
>* 您可以为每种类型的广告都建立不同的 VponAdRequest 物件，或是在所有的广告请求中都使用同一个 VpadnRequest 物件
>* 如果您想要指定更多投放条件，请参考[进阶设定](../advanced)


## 实作 Delegate protocol
---
完成广告请求后，您可以实作以下函数监听广告状态

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

# 横幅广告大小
---
除了标准尺吋 (320x50) 的横幅广告外，Vpon 还支援各种不同的横幅广告：

尺吋<br>(宽x高)             |     说明       |  VponAdSize 常数值              | 适用装置
:------------------------: | :-------------:| :-----------------------------:|:-----------:
320x50                     | 标准横幅广告     | banner              |iPhone<br>iPad
468x60                     | IAB 全横幅广告   |fullBanner           |iPad
728x90                     | IAB 超级横幅广告 |  leaderBoard        |iPad
300x250                    |IAB 中矩形广告    |mediumRectangle     |iPhone<br>iPad
320x480                    | 大型横幅广告     | largeRectangle      |iPhone<br>iPad

此外，也可使用 VponAdSize 的类别方法（class method）创建想要的尺吋，作为 init `VponBannerView` 的参数，例如：

### Objective-C

```objc
_bannerView = [[VponBannerView alloc] initWithAdSize:[VponAdSize mediumRectangle]];
```

### Swift

```swift
bannerView = VponBannerView(adSize: .mediumRectangle())
```

<!-- 320x100                    | 大型横幅广告     | VpadnAdSizeLARGEBANNER         |iPhone<br>iPad -->
<!-- device width x auto height | Custom Banner Size | VpadnAdSizeFromCGSize | iPhone<br>iPad -->

<!-- 如无特定需求，我们建议您直接使用上面 `VpadnAdSizeFromCGSize`，例：

```objc
vpadnBanner = [[VpadnBanner alloc] initWithAdSize:VpadnAdSizeFromCGSize(self.loadBannerView.frame.size) origin:CGPointZero];
``` -->

# Tips
---

### 确认广告曝光是否成功发送
请注意，Vpon SDK 不允许广告以以下方式呈现，致使广告在画面上可能不可见：

* 将 AdView 设为 Hdden
* 将 AdView 的 Alpha 值设为 < 1.0
* AdView 被其它 View(s) 遮盖住

当广告露出在页面上并达到曝光标准后，会印出以下的 Log 代表有送出广告曝光：

```
<VPON> [NOTE] Send impression successfully
```


### Sample Code
如果您想看到完整的串接实例，请参考我们的 [Sample Code]

### 适用于 Vpon SDK v5.6.0 以下版本的串接方法
如果您想了解 Vpon SDK v5.6.0 以下版本的串接方法，请参考[横幅广告](../banner-under560)


[串接说明]: ../integration-guide/
[Sample Code]: ../download/
[iOS9 ATS]: {{site.baseurl}}/zh-cn/ios/latest-news/ios9ats/
