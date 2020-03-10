---
layout: "ios"
title: "iOS - 横幅广告"
lead: "适用于 SDK v4.9 及以下版本的横幅广告串接说明"
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/banner-under5/
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

1. Import `VpadnSDKAdKit`
2. 在应用程式的 ViewController 中宣告 `VpadnBanner`
3. 建立 VpadnBanner 物件，并指定 License Key
4. 拉取广告
5. 实作 Delegate protocol

建议您可以在应用程式的 ViewController 内执行上述所有步骤。

## Import VpadnSDKAdKit 并宣告 VpadnBanner
---
```objc
#import <ViewController.h>

// import Vpon SDK
@import VpadnSDKAdKit;

// 增加一个 protocol 接收广告状态
@interface ViewController() <VpadnBannerDelegate>

// 宣告使用 VpadnBanner 广告
@property (strong, nonatomic) VpadnBanner *vpadnBanner;

@property (weak, nonatomic) IBOutlet UIView *loadBannerView;

@end
```


## 建立 VpadnBanner 物件
---
请参考以下程式码，在 ViewController 的 viewDidLoad 中初始化横横幅广告，并指定 License Key

```objc
@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    if (self.vpadnBanner != nil) {
            [self.vpadnBanner.getVpadnAdView removeFromSuperview];
    }

  vpadnBanner = [[VpadnBanner alloc] initWithAdSize:VpadnAdSizeBANNER];  // 初始化 Banner 物件
  vpadnBanner.strBannerId = @""; // 填入您的 License Key
  vpadnBanner.delegate = self; // 设定 Delegate 接受 protocol 回传讯息
  vpadnBanner.platform = @"TW"; // 请一律填写 "TW"
  [vpadnBanner setAdAutoRefresh:YES]; // set "YES" 启动 Banner 自动更新，若为 mediation 则 set "NO"
  [vpadnBanner setRootViewController:self];
  [self.loadBannerView addSubview:bannerView]; // 将 VpadnBanner 的 View 加入此 ViewController 中
  
  ...
}
```

## 拉取广告
---
完成 Banner 广告初始化设定后，请加入以下程式片段拉取广告：

```objc
- (void)viewDidLoad {
    ...

  // 开始拉取 Banner 广告
  [vpadnBanner startGetAd:[]]; 

  // 若要拉取测试 Banner 广告，请使用以下程式码
  // [vpadnBanner startGetAd:[self getTestIdentifiers]];
}
```

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
#pragma mark - Vpadn Banner Delegate
- (void)onVpadnAdReceived:(UIView *)bannerView{
    NSLog(@"广告抓取成功");
}

- (void)onVpadnAdFailed:(UIView *)bannerView didFailToReceiveAdWithError:(NSError *)error{
    NSLog(@"广告抓取失败");
}

- (void)onVpadnPresent:(UIView *)bannerView{
    NSLog(@"开启vpadn广告页面 %@",bannerView);
}

- (void)onVpadnDismiss:(UIView *)bannerView{
    NSLog(@"关闭vpadn广告页面 %@",bannerView);
}

- (void)onVpadnLeaveApplication:(UIView *)bannerView{
    NSLog(@"离开publisher application");
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

### App Transport Security
iOS9 更新了安全条款 App Transport Security (ATS)，请参考 [iOS9 ATS] 来修改部份设定

### Sample Code
如果您想看到完整的串接实例，请参考我们的 [Sample Code]

### 其它广告形式
如果您想了解其它广告形式的串接，请参考以下内容：

* [插页广告](../Interstitial)
* [原生广告](../native)
* [Out-stream 影音广告](../outstream)
* [中介服务](../mediation)
* [进阶设定](../advanced)


[串接说明]: ../integration-guide/
[Sample Code]: ../download/
[iOS9 ATS]: {{site.baseurl}}/zh-cn/ios/latest-news/ios9ats/
