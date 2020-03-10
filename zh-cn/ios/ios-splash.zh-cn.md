---
layout: "ios"
title: "iOS - 开屏广告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/splash/
lang: "zh-cn"
---


# 概要
--------
在原先等待应用程式开启的时间，以开屏广告来作为完美的转场效果，除了以自然且立即的方式呈现适合的广告内容以提升使用者体验，也可在此处结合应用程式商标，让使用者产生印象并留下深刻记忆。

<img class="width-400" src="{{site.imgurl}}/Splash_iOS.png" alt="successful result example">

# 完成串接准备
---
若您尚未完成串接广告形式前的串接说明，请先前往[串接说明]完成相关设定


## 开始撰写 Splash Ad
---

在应用程式中建立开屏广告需要执行以下七个步骤：

1. Import VpadnSDKAdKit
2. 宣告 VpadnSplash
3. 初始化 VpadnSplash 物件，并指定 License Key
4. 设置广告读取容易时间
5. 建立 VpadnRequest 物件，并请求广告
6. 实作 Delegate protocol

## Import VpadnSDKAdKit 并宣告 VpadnSplash
--------
首先汇入 SDK，宣告实作了 VpadnSplashDelegate protocol 以接收广告状态，并宣告 VpadnSplash 物件与 splashView。

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
在 SplashViewController 实作中初始化 vpadnSplash 物件，完成指定 splashID 及 splashView 后即可请求广告。(尚未申请 splashID 请先参考此[说明] )

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

## 设置容忍时间
---
在发出广告请求之前，借由 setEndurableSecond 设定最大可容忍的等待时间。

### Objective-C

```objc
[_vpadnSplash setEndurableSecond:3];
```

### Swift

```swift
vpadnSplash.setEndurableSecond(3)
```

>**Note:** 预设等待时间为3秒，若设置为 0 则完全不等待，仅会取用前次请求后 Cache 的广告。

## 建立 VpadnRequest 物件，并请求广告
---
在发出广告请求前，请先建立 VpadnRequest 物件物件：

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
>* 您可以为每种类型的广告都建立不同的 VpadnRequest 物件，或是在所有的广告请求中都使用同一个 VpadnRequest 物件
>* 如果您想要指定更多投放条件，请参考[进阶设定](../advanced)



## 实作 Delegate protocol
---
完成广告请求后，您可以实作以下函数监听广告状态：

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
如果您想看到完整的串接实例，请参考我们的 [Sample Code]

### 适用于 Vpon SDK v4.9 的串接方法
如果您想了解 Vpon SDK v4.9.1 或以下版本的串接方法，请参考[原生广告](../native-under5)

[串接说明]: {{site.baseurl}}/zh-cn/integration-guide/
[说明]: {{site.baseurl}}/zh-cn/ios/registration/
[这篇]: {{site.baseurl}}/zh-cn/ios/latest-news/ios9ats/
[1]: {{site.baseurl}}/zh-cn/ios/download/
[Sample Code]: {{ site.baseurl }}/zh-cn/ios/download/
