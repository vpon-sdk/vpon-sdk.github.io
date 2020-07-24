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
iOS 应用程式由 UIView 物件所组成，也就是以文字区域和按钮等控制项的形式向使用者显示的 Objective-C 执行个体。VpadnBanner 只是一种 UIView 子类别，用来显示由使用者点击触发的小型 HTML5 广告。

和所有的 UIView 一样，用程式码编写 VpadnBanner 很简单。以下为所需步骤:

1. Import VpadnSDKAdKit
2. 宣告 VpadnBanner
3. 初始化 VpadnBanner 物件，并指定 License Key
4. 建立 VpadnRequest 物件，并请求广告
5. 实作 Delegate protocol

建议您可以在应用程式的 ViewController 内执行上述所有步骤。

## Import VpadnSDKAdKit 并宣告 VpadnBanner
---

### Obejctive-C

```objc
@import VpadnSDKAdKit;
// Import Vpon SDK

@interface ViewController() <VpadnBannerDelegate>
@property (strong, nonatomic) VpadnBanner *vpadnBanner;
@property (weak, nonatomic) IBOutlet UIView *loadBannerView;

@end
```

### Swift

```swift
import VpadnSDKAdKit
// Import Vpon SDK

class VponSdkBannerViewController: UIViewController {
  @IBOutlet weak var requestButton: UIButton!
  @IBOutlet weak var loadBannerView: UIView!
}
```


## 初始化 VpadnBanner 物件
---
请参考以下程式码，初始化横横幅广告，并指定 License Key

### Objective-C

```objc
_vpadnBanner = [[VpadnBanner alloc] initWithLicenseKey:@"License Key" adSize: VpadnAdSizeBanner];
// initWithLicenseKey: Vpon License Key to get ad, please replace with your own one
// adSize: The Banner Ad size that will be displayed

_vpadnBanner.delegate = self;
```

### Swift

``` swift
vpadnBanner = VpadnBanner.init(licenseKey: "License Key", adSize: VpadnAdSizeBanner)
// licenseKey: Vpon License Key to get ad, please replace with your own one
// adSize: The Banner Ad size that will be displayed

vpadnBanner.delegate = self
```

## 建立 VpadnRequest 物件，并请求广告
---
在发出广告请求前，请先建立 VpadnRequest 物件：

### Objective-C

```objc
VpadnAdRequest *request = [[VpadnAdRequest alloc] init];

[request setAutoRefresh:YES];
// Only available for Banner Ad, will auto refresh ad if set YES

[request setTestDevices:@[[ASIdentifierManager sharedManager].advertisingIdentifier.UUIDString]];
// Set your test device's IDFA here if you're trying to get Vpon test ad

[_vpadnBanner loadRequest:request];
// Start to load ad
```

### Swift

```swift
let request = VpadnAdRequest.init()

request.setAutoRefresh(true)
// Only available for Banner Ad, will auto refresh ad if set YES

request.setTestDevices([ASIdentifierManager.shared().advertisingIdentifier.uuidString])
// Set your test device's IDFA here if you're trying to get Vpon test ad

vpadnBanner.load(request)
// start to load ad
```

>**Note**
>
>* 您可以为每种类型的广告都建立不同的 VpadnRequest 物件，或是在所有的广告请求中都使用同一个 VpadnRequest 物件
>* 如果您想要指定更多投放条件，请参考[进阶设定](../advanced)


## 实作 Delegate protocol
---
完成广告请求后，您可以实作以下函数监听广告状态

### Objective-C

```objc
- (void) onVpadnAdLoaded:(VpadnBanner *)banner {
    // Invoked if receive Banner Ad successfully

    [self.loadBannerView addSubview:banner.getVpadnAdView];
    // Add ad view to your layout
}
- (void) onVpadnAd:(VpadnBanner *)banner failedToLoad:(NSError *)error {
    // Invoked if received ad fail, check this callback to indicates what type of failure occurred
}
- (void) onVpadnAdWillLeaveApplication:(VpadnBanner *)banner {
    // Invoked if user leave the app and the current app was backgrounded
}
- (void) onVpadnAdRefreshed:(VpadnBanner *)banner {
   // Invoked if the Banner Ad will be refresh
}
```

### Swift

```swift
extension VponSdkBannerViewController : VpadnBannerDelegate {

    func onVpadnAdLoaded(_ banner: VpadnBanner) {
      // Invoked if receive Banner Ad successfully

      self.loadBannerView.addSubview(banner.getVpadnAdView())
      // Add ad view to your layout
    }
    func onVpadnAd(_ banner: VpadnBanner, failedToLoad error: Error) {
      // Invoked if received ad fail, check this callback to indicates what type of failure occurred
    }
    func onVpadnAdWillLeaveApplication(_ banner: VpadnBanner) {
      // Invoked if user leave the app and the current app was backgrounded
    }
    func onVpadnAdRefreshed(_ banner: VpadnBanner) {
      // Invoked if the Banner Ad will be refresh 
    }
}
```

# 横幅广告大小
---
除了标准尺吋 (320x50) 的横幅广告外，Vpon 还支援各种不同的横幅广告：

尺吋<br>(宽x高)             |     说明       |  VponAdSize 常数值              | 适用装置
:------------------------: | :-------------:| :-----------------------------:|:-----------:
320x50                     | 标准横幅广告     | VpadnAdSizeBANNER                   |iPhone<br>iPad
468x60                     | IAB 全横幅广告   |VpadnAdSizeFullBanner              |iPad
728x90                     | IAB 超级横幅广告 |  VpadnAdSizeLeaderboard        |iPad
300x250                    |IAB 中矩形广告    |VpadnAdSizeMediumRectangle            |iPhone<br>iPad
device width x auto height |Smart Banner Portrait |  VpadnAdSizeSmartBannerPortrait |iPhone<br>iPad
device width x auto height |Smart Banner Landscape|VpadnAdSizeSmartBannerLandscape  |iPhone<br>iPad


<!-- device width x auto height | Custom Banner Size | VpadnAdSizeFromCGSize | iPhone<br>iPad -->

<!-- 如无特定需求，我们建议您直接使用上面 `VpadnAdSizeFromCGSize`，例：

```objc
vpadnBanner = [[VpadnBanner alloc] initWithAdSize:VpadnAdSizeFromCGSize(self.loadBannerView.frame.size) origin:CGPointZero];
``` -->

# Tips
---

### 确认广告曝光是否成功发送
当广告露出在页面上并达到曝光标准后，会印出以下的 Log 代表有送出广告曝光：

```
<VPON> [NOTE] Send impression successfully
```


### Sample Code
如果您想看到完整的串接实例，请参考我们的 [Sample Code]

### 适用于 Vpon SDK v4.9 的串接方法
如果您想了解 Vpon SDK v4.9.1 或以下版本的串接方法，请参考[横幅广告](../banner-under5)


[串接说明]: ../integration-guide/
[Sample Code]: ../download/
[iOS9 ATS]: {{site.baseurl}}/zh-cn/ios/latest-news/ios9ats/
