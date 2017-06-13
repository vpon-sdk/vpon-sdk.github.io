---
layout: "ios"
title: "iOS - 原生广告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/native/
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
原生广告不同于以往横幅广告、插页广告会直接提供可立即呈现的广告内容，原生广告 API 提供了标题、图像等广告内容的组合，您可以透过这些属性的编排打造出最理想的原生广告风格。原生广告更打破以往对于广告的刻板印象，以最自然的方式呈现，提供更符合需求的广告体验。

在应用程式中建立原生广告需要执行以下五个步骤：

1. 汇入 Vpon SDK
2. 在应用程式的 UIViewController 中宣告 VpadnNativeAd
3. 建立 VpadnNativeAd 物件，并指定 NativeAd ID
4. 请求广告成功后利用回传的资料建置自订的原生 UI
5. 使用 nativeAd 执行个体注册广告检视

建议您最好在应用程式的 UIViewController 内执行上述所有步骤。

# 开始撰写 Native Ad
--------
首先汇入 SDK ，宣告实作了 VpadnNativeAdDelegate protocol 以接收广告状态，同时也宣告了欲在原生广告中呈现的各种元件。( 原生广告呈现元件规范请参照[Native Ad Spec](#nativeAdSpec) )

```objc
@import VpadnSDKAdKit;
#import "ViewController.h"

@interface ViewController ()<VpadnNativeAdDelegate>

@property (strong, nonatomic) VpadnNativeAd *nativeAd;
@property (weak, nonatomic) IBOutlet UILabel *statusLabel;
@property (weak, nonatomic) IBOutlet UIView *adView;
@property (weak, nonatomic) IBOutlet UIImageView *adIcon;
@property (weak, nonatomic) IBOutlet UIImageView *adCoverMedia;
@property (weak, nonatomic) IBOutlet UILabel *adTitle;
@property (weak, nonatomic) IBOutlet UILabel *adBody;
@property (weak, nonatomic) IBOutlet UIButton *adAction;
@property (weak, nonatomic) IBOutlet UILabel *adSocialContext;

@end
```

## 建立 VpadnNativeAd 物件
--------
在 ViewController 实作中初始化 VpadnNativeAd 物件，完成指定 NativeAd ID 后即可请求广告， removePreviousAd 可参考[清除原生广告](#clearNativeAd)。( 尚未申请 NativeAd ID 请先参考此[说明] )

```objc
- (IBAction)loadNativeAd:(id)sender {
    if(self.nativeAd) {
        [self removePreviousAd];
    }
    self.nativeAd = [[VpadnNativeAd alloc] initWithBannerID:@""];
    self.nativeAd.delegate = self;
    //如填入测试实机的 IDFA 会在该手机上显示测试广告，如宣告其为空字串会抓取正式广告
    [self.nativeAd loadAdWithTestIdentifiers:@[@"请填入手机的 IDFA"]];
}
```

## 广告资料汇入原生 UI
--------
完成请求原生广告后，下述五个函数可回传目前广告的各式状态，包含：

1. 请求成功
2. 请求失败
3. 原生广告成功显示
4. 解除原生广告
5. 执行 OutApp 应用程式

当广告`请求成功`时可将回传的素材建构成自订的原生广告型态。 Vpon SDK 会自动记录曝光次数并处理点击事件。您必须使用 nativeAd 注册广告检视，才能启用检视。使用 `registerViewForInteraction` 可使整个 view 都被注册，如需更细微的控制可以使用 `registerViewForInteraction:withViewController:withClickableViews:` 。

```objc
- (void)onVpadnNativeAdReceived:(VpadnNativeAd *)nativeAd {
    NSLog(@"VpadnNativeAd onVpadnNativeAdReceived");

    [self.statusLabel setHidden:YES];

    // icon
    __block typeof(self) safeSelf = self;
    [nativeAd.icon loadImageAsyncWithBlock:^(UIImage * _Nullable image) {
        safeSelf.adIcon.image = image;
    }];
    // media cover
    [nativeAd.coverImage loadImageAsyncWithBlock:^(UIImage * _Nullable image) {
        safeSelf.adCoverMedia.image = image;
    }];
    // text
    self.adTitle.text = nativeAd.title;
    self.adBody.text = nativeAd.body;
    [self.adAction setHidden:NO];
    [self.adAction setTitle:nativeAd.callToAction forState:UIControlStateNormal];
    self.adSocialContext.text = nativeAd.socialContext;
    //若要使整个检视都可点击，请使用下列程式码注册检视：
    [self.nativeAd registerViewForInteraction:self.adView withViewController:self];
    //如需更细微的控制，您可使用下列程式码指定可点击的子检视：
    //[self.nativeAd registerViewForInteraction:self.adView withViewController:self withClickableViews:@[self.adAction]];
    [self.adView setHidden:NO];
}

- (void)onVpadnNativeAd:(VpadnNativeAd *)nativeAd didFailToReceiveAdWithError:(NSError *)error {
    NSLog(@"VpadnNativeAd didFailToReceiveAdWithError: %@", error);
    [self.statusLabel setHidden:NO];
    [self.statusLabel setText:[NSString stringWithFormat:@"Request failed with error: %d %@", (int)error.code, error.domain]];
}

- (void)onVpadnNativeAdPresent:(VpadnNativeAd *)nativeAd {
    NSLog(@"VpadnNativeAd onVpadnNativeAdPresent");
}

- (void)onVpadnNativeAdDismiss:(VpadnNativeAd *)nativeAd {
    NSLog(@"VpadnNativeAd onVpadnNativeAdDismiss");
}

- (void)onVpadnNativeAdLeaveApplication:(VpadnNativeAd *)nativeAd {
    NSLog(@"NativeAdViewController onVpadnNativeAdLeaveApplication");
}
```

# 清除原生广告 {#clearNativeAd}
--------
若要重复使用检视，并在不同时间显示不同广告，则在请求新的原生广告之前必须先呼叫 removePreviousAd 将原先的广告清空。

```objc
- (void)removePreviousAd {
    [self.nativeAd unregisterView];
    self.nativeAd.delegate = nil;
    self.adIcon.image = nil;
    self.adCoverMedia.image = nil;
    self.adView.hidden = YES;
}
```

# 原生广告管理器
--------
Vpon SDK 提供原生广告管理器( Native Ads Manager )。当您设计的 App 中会在短时间内在数个地方显示原生广告，原生广告管理器可以协助您一次请求并管理多笔原生广告。如何使用原生广告管理器请直接参考 [Sample Code]。

# Navive Ad Spec {#nativeAdSpec}
--------
`红色`表示您必须显示的原生广告元件，其中 CoverImage 与 Icon 必须至少显示其中一个。

Properties   |   Description
:-----------:|:-----------:|
<font color="red">AdLabel</font>       | 让使用者了解此为广告
:-----------:|:-----------:|
<font color="red">Title</font>  | 最少需显示8个中文字, 放不下时须显示`...`
:-----------:|:-----------:|
<font color="red">CallToAction</font> | 需要完整显示
:-----------:|:-----------:|
<font color="red">CoverImage</font>   | 1200 x 627px (可等比例缩放，不可变形，不可裁切)
:-----------:|:-----------:|
<font color="red">Icon</font>     | 128 x 128px (可等比例缩放，不可变形，不可裁切)
:-----------:|:-----------:|
BodyText     | 最少显示20个中文字，或不要显示
:-----------:|:-----------:|
SocialContext| 需要完整显示
:-----------:|:-----------:|
RatingScale  | 5
:-----------:|:-----------:|
Rating Min/Max| 1/5
:-----------:|:-----------:|

# 下载范例
--------
本页以基本的 Native Ad 为例进行说明， [Sample Code] 中另有 Table View 的范例以供参考。<br>

# 中介服务
--------
透过中介服务，您的应用程式就能放送众多广告来源的广告，详细说明[请参阅]。

[串接说明]: ../integration-guide/
[说明]: {{ site.baseurl }}/zh-cn/ios/registration/
[Sample Code]: {{ site.baseurl }}/zh-cn/ios/download/
[请参阅]: {{ site.baseurl }}/zh-cn/ios/mediation/mopub
[这篇]: {{site.baseurl}}/zh-cn/ios/latest-news/ios9ats/
