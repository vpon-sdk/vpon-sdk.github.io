---
layout: "ios"
title: "iOS - 插页广告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/interstitial-under550/
lang: "zh-cn"
---
# 总览
---
插页式广告是互动式多媒体 HTML5 或「网络应用程式」，在应用程式的正常转换点显示 (例如启动、影片播放前或游戏关卡载入时)。网路应用程式使用上就像在应用程式内浏览一样，只有简单的关闭按钮，而没有任何导览列，因为导览配置就包含在内容本身。这类广告由于内容更丰富、更吸引人，因此製作起来更昂贵，而曝光机会相对有限。

![]({{site.imgurl}}/Interstitial.png)

# 完成串接准备
---
在开始串接广告之前，请确认您已经将 Vpon SDK 导入您的 Xcode 专案中。若您尚未完成，请先参考[串接说明]完成相关设定。

# 开始撰写 interstitial
---
Interstitial Ad 的内容更加丰富精彩，因为它是需要更多不同实例化、载入和显示步骤的 Object，而不是 View。


1. Import VpadnSDKAdKit
2. 宣告 VpadnInterstitial
3. 初始化 VpadnInterstitial 物件，并指定 License Key
4. 建立 VpadnRequest 物件，并请求广告
5. 展示广告
6. 实作 Delegate protocol

建议您在应用程式的 ViewController 内执行上述步骤。

## Import VpadnSDKAdKit 并宣告 VpadnInterstitial
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
请参考以下程式码始化插页广告，并指定 License Key

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

## 建立 VpadnRequest 物件，并请求广告
---
在发出广告请求前，请先建立 VpadnRequest 物件：

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
>* 您可以为每种类型的广告都建立不同的 VpadnRequest 物件，或是在所有的广告请求中都使用同一个 VpadnRequest 物件
>* 如果您想要指定更多投放条件，请参考[进阶设定](../advanced)



## 展示广告
---
在您完成 Interstitial 广告初始化设定并拉取广告后，您需要在广告请求成功后才能尝试显示广告。最简单的作法是当  onVpadnInterstitialAdReceived 被触发时时，例如：

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

> **Note**：为了维持良好的用户体验，我们建议可先抓取插页广告，待特定时机再将其显示，尽量避免抓取后立即显示

## 实作 Delegate protocol
---
完成广告请求后，您可以实作以下函数监听广告状态

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
}
```

# Tips
---

### 确认广告曝光是否成功发送
请注意，Vpon SDK 不允许广告以以下方式呈现，致使广告在画面上可能不可见：

* 将 AdView 设为 Hdden
* 将 AdView 的 Alpha 值设为 < 100%
* AdView 被其它 View(s) 遮盖住

当广告露出在页面上并达到曝光标准后，会印出以下的 Log 代表有送出广告曝光：

```
<VPON> [NOTE] Send impression successfully
```


### Sample Code
如果您想看到完整的串接实例，请参考我们的 [Sample Code]

### 适用于 Vpon SDK v4.9 的串接方法
如果您想了解 Vpon SDK v4.9.1 或以下版本的串接方法，请参考[插页广告](../interstitial-under5)

[串接说明]: ../integration-guide/
[Sample Code]: ../download/
[iOS9 ATS]: {{site.baseurl}}/zh-cn/ios/latest-news/ios9ats/
[进阶设定]: ../advanced/