---
layout: "ios"
title: "iOS - 开屏广告"
lead: "适用于 SDK v4.9 及以下版本的开屏广告串接说明"
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/splash-under5/
lang: "zh-cn"
---
## 完成串接指示
---
若您尚未完成串接广告形式前的串接说明，请先前往[串接说明]完成相关设定

## 最新消息
---
iOS10 更新了安全条款 App Transport Security (ATS)，请参考[这篇]来修改部份设定

# 概要
--------
在原先等待应用程式开启的时间，以开屏广告来作为完美的转场效果，除了以自然且立即的方式呈现适合的广告内容以提升使用者体验，也可在此处结合应用程式商标，让使用者产生印象并留下深刻记忆。

<img class="width-400" src="{{site.imgurl}}/Splash_iOS.png" alt="successful result example">

在应用程式中建立开屏广告需要执行以下七个步骤：

1. 汇入 Vpon SDK
2. 于应用程式建立 UIViewController 类别，命名为 SplashViewController
3. 于 StoryBoard (or Xib) 建立 UIViewController，并指定 class 为 SplashViewController
4. 于 SplashViewController 页面新增 UIView，命名为 splashView
5. 建立 VpadnSplash 物件，指定 License Key、splashView，并请求广告
6. 将应用程式开启时的 UIWindow rootViewController 指定为 splashViewController
7. 应用程式重启即可显示开屏

# 开始撰写 Splash Ad
--------
首先汇入 SDK，宣告实作了 VpadnSplashDelegate protocol 以接收广告状态，并宣告 VpadnSplash 物件与 splashView。

```objc
@import VpadnSDKAdKit;
#import "VponSdkSplashViewController.h"
@interface VponSdkSplashViewController () <VpadnSplashDelegate>
@property (weak, nonatomic) IBOutlet UIView *splashView;
@property (strong, nonatomic) VpadnSplash *vpadnSplash;
@end
```

## 建立 VpadnSplash 物件
--------
在 SplashViewController 实作中初始化 vpadnSplash 物件，完成指定 splashID 及 splashView 后即可请求广告。( 尚未申请 splashID 请先参考此[说明] )

```objc
- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    self.vpadnSplash = [[VpadnSplash alloc] initWithSplashId:@"License Key" withTarget:self.splashView];
    self.vpadnSplash.delegate = self;
    [self.vpadnSplash setEndurableSecond:3];
    //  If you would like to show the test ad, please use the following codes to set 'Yes' as the value of setTestMode and key in your device's IDFA.
    [self.vpadnSplash setTestMode:YES];
    [self.vpadnSplash loadSplashWithTestIdentifiers:@[@"Key in your device's IDFA"]];
}
```

## 开屏广告 Callback
--------
完成请求开屏广告后，下述五个函数可回传目前广告的各式状态，包含：

1. 请求成功并显示
2. 请求失败
3. 广告被点击
4. 即将离开应用程式
5. 广告允许被关闭

当广告`请求成功并显示`会透过 `onVpadnSplashReceived` 通知；请求失败会透过 `onVpadnSplash:didFailToReceiveAdWithError` 通知。广告会自动加载在指定的 splashView 上，应用程式无需做额外的处理。此外每则广告皆独立的显示时间，当显示时间到达标准会透过 `onVpadnSplashAllowToDismiss` 通知允许关闭广告。

```objc
- (void)onVpadnSplashReceived:(nonnull VpadnSplash *)vpadnSplash {
    NSLog(@"onVpadnSplashReceived");
}

- (void)onVpadnSplash:(nonnull VpadnSplash *)vpadnSplash didFailToReceiveAdWithError:(nullable NSError *)error {
    NSLog(@"onVpadnSplash:didFailToReceiveAdWithError");
    [self backToMainPage]; //Back to the main page
}

- (void)onVpadnSplashClicked:(nonnull VpadnSplash *)vpadnSplash {
    NSLog(@"onVpadnSplashClicked");
}

- (void)onVpadnSplashLeaveApplication:(nonnull VpadnSplash *)vpadnSplash {
    NSLog(@"onVpadnSplashLeaveApplication");
}

- (void)onVpadnSplashAllowToDismiss:(nonnull VpadnSplash *)vpadnSplash {
    NSLog(@"onVpadnSplashDismiss");
    [self backToMainPage]; //Back to the main page
}
```

# 下载范例
--------
[前往下载][1]

[串接说明]: {{site.baseurl}}/zh-cn/integration-guide/
[说明]: {{site.baseurl}}/zh-cn/ios/registration/
[这篇]: {{site.baseurl}}/zh-cn/ios/latest-news/ios9ats/
[1]: {{site.baseurl}}/zh-cn/ios/download/
