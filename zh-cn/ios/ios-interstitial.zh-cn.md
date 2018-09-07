---
layout: "ios"
title: "iOS - 插页广告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/interstitial/
lang: "zh-cn"
---

# 总览
---
插页式广告是互动式多媒体 HTML5 或「网络应用程式」，在应用程式的正常转换点显示 (例如启动、影片播放前或游戏关卡载入时)。网路应用程式使用上就像在应用程式内浏览一样，只有简单的关闭按钮，而没有任何导览列，因为导览配置就包含在内容本身。这类广告由于内容更丰富、更吸引人，因此製作起来更昂贵，而曝光机会相对有限。

![]({{site.imgurl}}/Interstitial.png)

# 完成串接准备
---
在开始串接广告之前，请确认您已经将 Vpon SDK 导入您的 Xcode 专案中。若您尚未完成，请先参考[串接说明]完成相关设定。

# 开始撰写 nterstitial
---
Interstitial Ad 的内容更加丰富精彩，因为它是需要更多不同实例化、载入和显示步骤的 Object，而不是 View。


1. Import `VpadnSDKAdKit`
2. 在应用程式的 ViewController 中宣告 `VpadnInterstitial`
3. 建立 VpadnInterstitial 物件，并指定 License ID
4. 拉取广告
5. 展示广告
6. 实作 Delegate protocol

建议您在应用程式的 ViewController 内执行上述步骤。

## Import VpadnSDKAdKit 并宣告 VpadnInterstitial
---
```objc
#import <ViewController.h>

// import Vpon SDK
@import VpadnSDKAdKit;

// 增加一个 protocol 接收广告状态
@interface ViewController() <VpadnInterstitialDelegate>

// 宣告使用 VpadnInterstitial 广告
@property (strong, nonatomic) VpadnInterstitial *vpadnInterstitial;

@end
```

## 建立 VpadnInterstitial 物件
---
请参考以下程式码，在 ViewController 的 viewDidLoad 中初始化插页广告，并指定 Banner ID

```objc
@implementation ViewController

- (void)viewDidLoad {
    vpadnInterstitial = [[VpadnInterstitial alloc] init];
    vpadnInterstitial.strBannerId = @""; // 填入您的 License ID
    vpadnInterstitial.platform = @"TW"; // 请一律填写 "TW"
    vpadnInterstitial.delegate = self;
    [vpadnInterstitial getInterstitial:@[]]; // 开始拉取 Interstitial 广告

    // 若要拉取测试 Interstitial 广告，请使用以下程式码
  // [vpadnInterstitial getInterstitial:[self getTestIdentifiers]];
}
@end
```

> **Note**：插页广告所使用的 License ID 不能与横幅广告所用的 License ID 重复


## 展示广告
---
在您完成 Interstitial 广告初始化设定并拉取广告后，您需要在广告请求成功后才能尝试显示广告。最简单的作法是当  onVpadnInterstitialAdReceived 收到通知时，执行 `[vpadnInterstitial show]`。

```objc
- (void)onVpadnInterstitialAdReceived:(UIView *)bannerView {
    [self.vpadnInterstitial show];
}
```

> **Note**：为了维持良好的用户体验，我们建议可先抓取插页广告，待特定时机再将其显示，尽量避免抓取后立即显示

## 测试广告
---
Vpon SDK 提供测试广告。请新增此 function 到您的程式内，并填入测试装置的 UUID，即可拉取测试广告

```objc
-(NSArray*)getTestIdentifiers {
  return [NSArray arrayWithObjects:
    // Add your test device's UUID
    @"your_UUID",
    nil];
}
```

## 实作 Delegate protocol
---
完成广告请求后，您可以实作以下函数监听广告状态

```objc
#pragma mark VpadnInterstitial Delegate
- (void)onVpadnInterstitialAdReceived:(UIView *)bannerView{
    NSLog(@"插页广告抓取成功");
    // 显示插页广告
    [vpadnInterstitial show];
}

- (void)onVpadnInterstitialAdFailed:(UIView *)bannerView{
    NSLog(@"插页广告抓取失败");
}

- (void)onVpadnInterstitialAdDismiss:(UIView *)bannerView{
    NSLog(@"关闭插页广告 %@",bannerView);
}
```

> **Note**： 若想进一步瞭解 protocol 相关详情，请参阅[进阶设定]。

# Tips
---

### App Transport Security
iOS9 更新了安全条款 App Transport Security (ATS)，请参考 [iOS9 ATS] 来修改部份设定

### Sample Code
如果您想看到完整的串接实例，请参考我们的 [Sample Code]

### 其它广告形式
如果您想了解其它广告形式的串接，请参考以下内容：

* [横幅广告](../banner)
* [原生广告](../native)
* [中介服务](../mediation)
* [进阶设定](../advanced)

[串接说明]: ../integration-guide/
[Sample Code]: ../download/
[iOS9 ATS]: {{site.baseurl}}/zh-cn/ios/latest-news/ios9ats/
[进阶设定]: ../advanced/