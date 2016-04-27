---
layout: "ios"
title: "iOS - 横幅广告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/banner/
lang: "zh-cn"
---
## 完成串接指示
---
若您尚未完成串接广告形式前的串接说明，请先前往[串接说明]完成相关设定

# 概要
--------
Vpon 横幅广告 (banner) 利用画面的一小部分来吸引使用者点击，即可打开全萤幕享受更丰富的浏览体验，例如网站或应用程式商店网页。

# 开始撰写 Banner
---
iOS 应用程式由 UIView 物件所组成，也就是以文字区域和按钮等控制项的形式向使用者显示的 Objective-C 执行个体。VpadnBanner 只是一种 UIView 子类别，用来显示由使用者点击触发的小型 HTML5 广告。

和所有的 UIView 一样，用程式码编写 VpadnBanner 很简单。以下为所需步骤:

1. 汇入 `VpadnBanner.h` 与 `VpadnInterstitial.h`
2. 在应用程式的 UIViewController 中宣告 `VpadnBanner`
3. 建立 VpadnBanner 物件
4. 指定 BannerId，也就是 Vpadn 申请的 BannerId
5. 设定 window 的rootViewController
6. 将该 View 加进 ViewController 内
7. 拉取广告

建议您最好在应用程式的 UIViewController 内执行上述所有步骤。

```objc
#import <UIKit/UIKit.h>
// 载入标头档
#import "VpadnBanner.h"
#import "VpadnInterstitial.h"

// 增加两个protocol接收广告状态
@interface ViewController : UIViewController<VpadnBannerDelegate, VpadnInterstitialDelegate>
{
    VpadnBanner*    vpadnAd; // 宣告使用VpadnBanner广告
    VpadnInterstitial*    vpadnInterstitial; // 宣告使用Vpadn插屏广告
}
@end
```


## 初始化设定

以下程式码会在 viewController的 viewDidLoad 初始化步骤中设定横幅广告。

```objc
@implementation ViewController

- (void)dealloc
{
    if(nil != vpadnAd)
    {
        [vpadnAd release];
        vpadnAd = nil;
    }
    if(nil != vpadnInterstitial)
    {
        [vpadnInterstitial release];
        vpadnInterstitial = nil;
    }
    [super dealloc];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
    BOOL bStatusBarHide = [UIApplication sharedApplication].statusBarHidden;
    float screenHeight = [[UIScreen mainScreen] bounds].size.height;
    if(!bStatusBarHide)
        screenHeight -= 20;
    // 设定广告位置
    CGPoint origin = CGPointMake(0.0,screenHeight - CGSizeFromVpadnAdSize(VpadnAdSizeSmartBannerPortrait).height);
    vpadnAd = [[VpadnBanner alloc] initWithAdSize:VpadnAdSizeSmartBannerPortrait origin:origin];  // 初始化Banner物件
    vpadnAd.strBannerId = @"";   // 填入您的BannerId
    vpadnAd.delegate = self;       // 设定delegate接收protocol回传讯息
    vpadnAd.platform = @"TW";       // 台湾地区请填TW 大陆则填CN
    [vpadnAd setAdAutoRefresh:YES]; //如果为mediation则set NO
    [vpadnAd setRootViewController:self]; //请将window的rootViewController设定在此 以便广告顺利执行
    [self.view addSubview:[vpadnAd getVpadnAdView]]; // 将VpadnBanner的View加入此ViewController中
    [vpadnAd startGetAd:[self getTestIdentifiers]]; // 开始抓取Banner广告

}
```


```objc
#pragma mark VpadnAdDelegate method 接一般Banner广告就需要新增
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

#pragma mark VpadnInterstitial Delegate 有接Interstitial的广告才需要新增
- (void)onVpadnInterstitialAdReceived:(UIView *)bannerView{
    NSLog(@"插屏广告抓取成功");
    // 显示插屏广告
    [vpadnInterstitial show];
}

- (void)onVpadnInterstitialAdFailed:(UIView *)bannerView{
    NSLog(@"插屏广告抓取失败");
}

- (void)onVpadnInterstitialAdDismiss:(UIView *)bannerView{
    NSLog(@"关闭插屏广告页面 %@",bannerView);
}

#pragma mark 通知关闭vpadn开屏广告
- (void)onVpadnSplashAdDismiss{
    NSLog(@"关闭vpadn开屏广告页面");
}

@end
```

## 测试广告

```objc
// 请新增此function到您的程式内 如果为测试用 则在下方填入UUID，即可看到测试广告。
-(NSArray*)getTestIdentifiers
{
  return [NSArray arrayWithObjects:
    // add your test UUID
    @"your_UUID",
    nil];
}
```

# 横幅广告大小
---
除了支援手机上的 320x50 大小外，Vpon 还支援各种不同的横幅广告：

大小 (宽度x高度)             |     说明       |  VponAdSize 常数值              | 适用装置
:------------------------: | :-------------:| :-----------------------------:|:-----------:
320x50                     | 标准横幅广告     | VpadnAdSizeBANNER                   |iPhone & iPad
468x60                     | IAB 全横幅广告   |VpadnAdSizeFullBanner              |iPad
728x90                     | IAB 超级横幅广告 |  VpadnAdSizeLeaderboard        |iPad
300x250                    |IAB 中矩形广告    |VpadnAdSizeMediumRectangle            |iPhone & iPad
device width x auto height |Smart Banner Portrait |  VpadnAdSizeSmartBannerPortrait |iPhone & iPad
device width x auto height |Smart Banner Landscape|VpadnAdSizeSmartBannerLandscape  |iPhone & iPad

如无特定需求，我们建议您直接使用上面 `smart banner`(portrait or landscape)即可

# 更新广告
---
如果您在伺服器的 Vpon 帐户中指定了更新速率，且需要使用下面的 sample 才会启动 banner 自动更新

`[vpadnAd setAdAutoRefresh:YES];`



# 下载 Sample code
---
[前往下载]

# 结果
---
现在只要执行这个应用程式，您应该就会在画面上看到横幅广告：
<img src="{{site.imgurl}}/IOS-Banner_result.png" alt="" class="width-300"/>


# App Transport Security
---
iOS9 多了安全条款 App Transport Security (ATS)，若您使用 Xcode 7 建立 iOS9 专案，请参考[这篇]来修改部份设定

# 其他诀窍
> 请参阅[插页广告](../Interstitial)、[中介服务](../mediation)、[进阶设定](../advanced)中获取更多简介。


[串接说明]: ../integration-guide/
[前往下载]: ../download/
[这篇]: {{site.baseurl}}/zh-cn/ios/latest-news/ios9ats/
