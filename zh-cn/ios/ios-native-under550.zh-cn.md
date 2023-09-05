---
layout: "ios"
title: "iOS - 原生广告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/native-under550/
lang: "zh-cn"
---

# 概要
--------
原生广告不同于以往横幅广告、插页广告会直接提供可立即呈现的广告内容，原生广告 API 提供了标题、图像等广告内容的组合，您可以透过这些属性的编排打造出最理想的原生广告风格。原生广告更打破以往对于广告的刻板印象，以最自然的方式呈现，提供更符合需求的广告体验。

<img src="{{site.imgurl}}/Native_iOS.PNG" alt="" class="width-300"/>

# 完成串接准备
---
在开始串接广告之前，请确认您已经将 Vpon SDK 导入您的 Xcode 专案中。若您尚未完成，请先参考[串接说明]完成相关设定。

# 开始撰写 Native Ad
--------
在应用程式中建立原生广告需要执行以下五个步骤：

1. Import VpadnSDKAdKit
2. 宣告 VpadnNativeAd 及自定义 UI
3. 初始化 VpadnNativeAd 物件，并指定 License Key
4. 建立 VpadnRequest 物件，并请求广告
4. 利用回传的资料建置自订的原生 UI
5. 实作 Delegate protocol

建议您最好在应用程式的 ViewController 内执行上述所有步骤。


## Import VpadnSDKAdKit 并宣告 VpadnNativeAd
---

首先汇入 SDK ，宣告实作了 VpadnNativeAdDelegate, VpadnMediaViewDelegate protocol 以接收广告状态，同时也宣告了欲在原生广告中呈现的各种元件。(原生广告呈现元件规范请参照[Native Ad Spec](#nativeAdSpec))

### Objective-C

```objc
@import VpadnSDKAdKit;
// Import Vpon SDK

@interface ViewController () <VpadnMediaViewDelegate, VpadnNativeAdDelegate>

@property (strong, nonatomic) VpadnNativeAd *nativeAd;

@property (weak, nonatomic) IBOutlet UIView *contentView;

@property (weak, nonatomic) IBOutlet UIImageView *adIcon;
@property (weak, nonatomic) IBOutlet UILabel *adTitle;
@property (weak, nonatomic) IBOutlet UILabel *adBody;
@property (weak, nonatomic) IBOutlet UILabel *adSocialContext;
@property (weak, nonatomic) IBOutlet UIButton *adAction;
@property (weak, nonatomic) IBOutlet VpadnMediaView *adMediaView;

@end
```

### Swift

```swift
import VpadnSDKAdKit
// Import Vpon SDK

class VponSdkNativeViewController: UIViewController {
    
    var vpadnNative: VpadnNativeAd!
    @IBOutlet weak var contentView: UIView!
    @IBOutlet weak var adIcon: UIImageView!
    @IBOutlet weak var adTitle: UILabel!
    @IBOutlet weak var adBody: UILabel!
    @IBOutlet weak var adSocialContext: UILabel!
    @IBOutlet weak var adAction: UIButton!
    @IBOutlet weak var adMediaView: VpadnMediaView!
}
```

## 初始化 VpadnNativeAd 物件
--------
请参考以下程式码初始化原生广告，并指定 License Key

### Objective-C

```objc
_nativeAd = [[VpadnNativeAd alloc] initWithLicenseKey:@"License Key"];
// initWithLicenseKey: Vpon License Key to get ad, please replace with your own one

_nativeAd.delegate = self;
```

### Swift

```swift
vpadnNative = VpadnNativeAd.init(licenseKey: "License Key")
// initWithLicenseKey: Vpon License Key to get ad, please replace with your own one

vpadnNative.delegate = self
```

## 建立 VpadnRequest 物件，并请求广告
---
在发出广告请求前，请先建立 VpadnRequest 物件：

### Objective-C

```objc
VpadnAdRequest *request = [[VpadnAdRequest alloc] init];

[request setTestDevices:@[[ASIdentifierManager sharedManager].advertisingIdentifier.UUIDString]];
// Set your test device's IDFA here if you're trying to get Vpon test ad

[_nativeAd loadRequest:request];
// Start to load ad
```

### Swift

```swift
let request = VpadnAdRequest.init()

request.setTestDevices([ASIdentifierManager.shared().advertisingIdentifier.uuidString])
// Set your test device's IDFA here if you're trying to get Vpon test ad

vpadnNative.load(request())
// start to load ad
```

>**Note**
>
>* 您可以为每种类型的广告都建立不同的 VpadnRequest 物件，或是在所有的广告请求中都使用同一个 VpadnRequest 物件
>* 如果您想要指定更多投放条件，请参考[进阶设定](../advanced)


## 自订原生广告 UI
---
当 onVpadnNativeAdLoaded 被触发时，即取得可用的广告资料，此时可将资料布局至自定义 UI，请参考以下程式码：

### Objective-C

```objc
- (void)setNativeAd {
    _adIcon.image = nil;
    
    __block typeof(self) safeSelf = self;
    [_nativeAd.icon loadImageAsyncWithBlock:^(UIImage * _Nullable image) {
        safeSelf.adIcon.image = image;
    }];
    
    [_adMediaView setNativeAd:_nativeAd];
    _adMediaView.delegate = self;
    
    _adTitle.text = [_nativeAd.title copy];
    _adBody.text = [_nativeAd.body copy];
    _adSocialContext.text = [_nativeAd.socialContext copy];
    [_adAction setTitle:[_nativeAd.callToAction copy] forState:UIControlStateNormal];
    [_adAction setTitle:[_nativeAd.callToAction copy] forState:UIControlStateHighlighted];
    
    [_nativeAd registerViewForInteraction:_contentView withViewController:self];
    // You must register the Ad View to make the ad clickable

    // [_nativeAd registerViewForInteraction:withViewController:withClickableViews:self._adAction];
    // You can also register a specific ad component to make the Ad View to be clickable partly
}
```

### Swift

```swift
func setNativeAd() {
        adIcon.image = nil
            
        vpadnNative.icon.loadAsync { (image) in
            self.adIcon.image = image
        }
        
        adMediaView.nativeAd = vpadnNative
        adMediaView.delegate = self
            
        adTitle.text = vpadnNative.title
        adBody.text = vpadnNative.body
        adSocialContext.text = vpadnNative.socialContext
        adAction.setTitle(vpadnNative.callToAction, for: .normal)
        adAction.setTitle(vpadnNative.callToAction, for: .highlighted)
        
        vpadnNative.registerView(forInteraction: contentView, with: self)
        // You must register the Ad View to make the ad clickable

        vpadnNative.registerView(forInteraction: withViewController, with: self.adAction)
        // You can also register a specific ad component to make the Ad View to be clickable partly
    }

```

## 实作 Delegate protocol
---
完成广告请求后，您可以实下以下函数监听广告状态：

### Objective-C

```objc
- (void) onVpadnNativeAdLoaded:(VpadnNativeAd *)nativeAd {
    // Invoked if receive Native Ad successfully

    [self setNativeAd];
    // Construct Native Ad with returned components
}
- (void) onVpadnNativeAd:(VpadnNativeAd *)nativeAd failedToLoad:(NSError *)error {
    // Invoked if received ad fail, check this callback to indicates what type of failure occurred
}
- (void) onVpadnNativeAdWillLeaveApplication:(VpadnNativeAd *)nativeAd {
    // Invoked if user leave the app and the current app was backgrounded
}
- (void) mediaViewDidLoad:(VpadnMediaView *)mediaView {
    // Invoked if the media creatives load sucessfully
}
- (void) mediaViewDidFailed:(VpadnMediaView *)mediaView error:(NSError *)error {
    // Invoked if the media creatives load fail
}
```

### Swift

```swift
extension VponSdkNativeViewController: VpadnNativeAdDelegate, VpadnMediaViewDelegate {
    
    func onVpadnNativeAdLoaded(_ nativeAd: VpadnNativeAd) {
        // Invoked if receive Native Ad successfully

        self.setNativeAd()
        // Construct Native Ad with returned components
    }
    func onVpadnNativeAd(_ nativeAd: VpadnNativeAd, failedToLoad error: Error) {
        // Invoked if received ad fail, check this callback to indicates what type of failure occurred
    }
    func onVpadnNativeAdWillLeaveApplication(_ nativeAd: VpadnNativeAd) {
        // Invoked if user leave the app and the current app was backgrounded
    }
    func mediaViewDidLoad(_ mediaView: VpadnMediaView) {
        // Invoked if the media creatives load sucessfully
    }
    func mediaViewDidFailed(_ mediaView: VpadnMediaView, error: Error) {
        // Invoked if the media creatives load fail  
    }
}
```

<!-- # 原生广告管理器
--------
Vpon SDK 提供原生广告管理器( Native Ads Manager )。当您设计的 App 中会在短时间内在数个地方显示原生广告，原生广告管理器可以协助您一次请求并管理多笔原生广告。如何使用原生广告管理器请直接参考 [Sample Code]。 -->

# Native Ad Spec {#nativeAdSpec}
--------
`红色`表示您必须显示的原生广告元件，其中 CoverImage 与 Icon 必须至少显示其中一个。

Properties   |   Description
:-----------:|:-----------:|
<font color="red">AdLabel</font>      | 让使用者了解此为广告 (例如： 赞助、广告 等等)
:-----------:|:-----------:|
<font color="red">Title</font>  | 最少需显示8个中文字, 放不下时须显示`...`
:-----------:|:-----------:|
CoverImage   | 1200 x 627px (可等比例缩放，不可变形，不可裁切)
:-----------:|:-----------:|
Icon         | 128 x 128px (可等比例缩放，不可变形，不可裁切)
:-----------:|:-----------:|
CallToAction | 需要完整显示
:-----------:|:-----------:|
BodyText     | 最少显示20个中文字，或不要显示
:-----------:|:-----------:|
SocialContext| 需要完整显示 <br> *适用于 SDK v4.9.3 及以下版本*
:-----------:|:-----------:|
RatingScale  | 5
:-----------:|:-----------:|
Rating Min/Max| 1/5
:-----------:|:-----------:|



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


### 下载范例
--------
本页以基本的 Native Ad 为例进行说明， [Sample Code] 中另有 Table View 的范例以供参考。<br>

### 适用于 Vpon SDK v4.9 的串接方法
如果您想了解 Vpon SDK v4.9.1 或以下版本的串接方法，请参考[原生广告](../native-under5)

[串接说明]: ../integration-guide/
[说明]: {{ site.baseurl }}/zh-cn/ios/registration/
[Sample Code]: {{ site.baseurl }}/zh-cn/ios/download/
[使用 AdMob]: {{ site.baseurl }}/zh-cn/ios/mediation/admob/#customevent
[使用 MoPub]: {{ site.baseurl }}/zh-cn/ios/mediation/mopub
[使用 Smaato]: {{ site.baseurl }}/zh-cn/ios/native/mediation/smaato
[这篇]: {{site.baseurl}}/zh-cn/ios/latest-news/ios9ats/
