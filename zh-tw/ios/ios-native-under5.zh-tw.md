---
layout: "ios"
title: "iOS - 原生廣告"
lead: "適用於 SDK v4.9 及以下版本的原生廣告串接說明"
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/native-under5/
lang: "zh-tw"
---

# 概要
--------
原生廣告不同於橫幅廣告、插頁廣告會直接提供可立即呈現的廣告內容，原生廣告 API 提供了標題、圖像等廣告內容的組合，您可以透過這些屬性的編排打造出最理想的原生廣告風格。原生廣告更打破以往對於廣告的刻板印象，以最自然的方式呈現，提供更符合需求的廣告體驗。

<img src="{{site.imgurl}}/Native_iOS.PNG" alt="" class="width-300"/>

>**Note:** 此為適用於 `Vpon SDK v4.9.3 及以下版本`的串接方式，如果您串接的 SDK 版本為 v5.0.2 或以上版本，請參考[最新版本的原生廣告串接說明](../native)

# 完成串接準備
---
在開始串接廣告之前，請確認您已經將 Vpon SDK 導入您的 Xcode 專案中。若您尚未完成，請先參考[串接說明]完成相關設定。

# 原生廣告選擇
---
Vpon 提供兩種原生廣告的形式：

1. [基本原生廣告]
2. [原生廣告 - Table View]

本頁以基本原生廣告為例，Table View 形式的原生廣告可由點擊上方連結獲得更詳細說明。

# 開始撰寫 Native Ad
--------
在應用程式中建立原生廣告需要執行以下五個步驟：

1. 匯入 Vpon SDK
2. 在應用程式的 UIViewController 中宣告 VpadnNativeAd
3. 建立 VpadnNativeAd 物件，並指定 License Key
4. 請求廣告成功後利用回傳的資料建置自訂的原生 UI
5. 使用 nativeAd 執行個體註冊廣告檢視

建議您最好在應用程式的 UIViewController 內執行上述所有步驟。

# 開始撰寫 Native Ad
--------
首先匯入 SDK ，宣告實作了 VpadnNativeAdDelegate protocol 以接收廣告狀態，同時也宣告了欲在原生廣告中呈現的各種元件。( 原生廣告呈現元件規範請參照[Native Ad Spec](#nativeAdSpec) )


```objc
@import VpadnSDKAdKit;
#import "ViewController.h"

@interface ViewController ()<VpadnNativeAdDelegate>
/* For SDK version 4.7.1 or above */
@interface ViewController ()<VpadnNativeAdDelegate, VpadnMediaViewDelegate>

@property (strong, nonatomic) VpadnNativeAd *nativeAd;
@property (weak, nonatomic) IBOutlet UILabel *statusLabel;
@property (weak, nonatomic) IBOutlet UIView *adView;
@property (weak, nonatomic) IBOutlet UIImageView *adIcon;
@property (weak, nonatomic) IBOutlet UIImageView *adCoverMedia;
@property (weak, nonatomic) IBOutlet UILabel *adTitle;
@property (weak, nonatomic) IBOutlet UILabel *adBody;
@property (weak, nonatomic) IBOutlet UIButton *adAction;
@property (weak, nonatomic) IBOutlet UILabel *adSocialContext;
/* For SDK version 4.7.1 or above */
@property (weak, nonatomic) IBOutlet VpadnMediaView *adMediaView;

@end
```

## 建立 VpadnNativeAd 物件
--------
在 ViewController 實作中初始化 VpadnNativeAd 物件，完成指定 License Key 後即可請求廣告， removePreviousAd 可參考[清除原生廣告](#clearNativeAd)。( 尚未申請 License Key 請先參考此[說明] )


```objc
- (IBAction)loadNativeAd:(id)sender {
    if(self.nativeAd) {
        [self removePreviousAd];
    }
    self.nativeAd = [[VpadnNativeAd alloc] initWithBannerID:@""];
    self.nativeAd.delegate = self;
    //如填入測試實機的 IDFA 會在該手機上顯示測試廣告，如宣告其為空字串會抓取正式廣告
    [self.nativeAd loadAdWithTestIdentifiers:@[@"請填入手機的 IDFA"]];
}
```

## 原生廣告 Callback
--------
完成請求原生廣告後，下述五個函數可回傳目前廣告的各式狀態，包含：

1. 請求成功
2. 請求失敗
3. 原生廣告成功顯示
4. 解除原生廣告
5. 執行 OutApp 應用程式

當廣告`請求成功`時可將回傳的素材建構成自訂的原生廣告型態。 Vpon SDK 會自動記錄曝光次數並處理點擊事件。您必須使用 nativeAd 註冊廣告檢視，才能啟用檢視。使用 `registerViewForInteraction` 可使整個 view 都被註冊，如需更細微的控制可以使用 `registerViewForInteraction:withViewController:withClickableViews:` 。

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
    /* For SDK version 4.7.0 or below
    [nativeAd.coverImage loadImageAsyncWithBlock:^(UIImage * _Nullable image) {
        safeSelf.adCoverMedia.image = image;
    }];
    */
    /* For SDK version 4.7.1 or above */
    self.adMediaView.delegate = self;
    [self.adMediaView setNativeAd:nativeAd];
    // text
    self.adTitle.text = nativeAd.title;
    self.adBody.text = nativeAd.body;
    [self.adAction setHidden:NO];
    [self.adAction setTitle:nativeAd.callToAction forState:UIControlStateNormal];
    self.adSocialContext.text = nativeAd.socialContext;
    //若要使整個檢視都可點擊，請使用下列程式碼註冊檢視：
    [self.nativeAd registerViewForInteraction:self.adView withViewController:self];
    //如需更細微的控制，您可使用下列程式碼指定可點擊的子檢視：
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

/* For SDK version 4.7.1 or above */
- (void) mediaViewDidLoad:(VpadnMediaView *)mediaView {
    NSLog(@"mediaViewDidLoad");
}
```

# 清除原生廣告 {#clearNativeAd}
--------
若要重複使用檢視，並在不同時間顯示不同廣告，則在請求新的原生廣告之前必須先呼叫 removePreviousAd 將原先的廣告清空。

```objc
- (void)removePreviousAd {
    [self.nativeAd unregisterView];
    self.nativeAd.delegate = nil;
    self.adIcon.image = nil;
    self.adCoverMedia.image = nil;
    self.adView.hidden = YES;
}
```


# 原生廣告管理器
--------
Vpon SDK 提供原生廣告管理器( Native Ads Manager )。當您設計的 App 中會在短時間內在數個地方顯示原生廣告，原生廣告管理器可以協助您一次請求並管理多筆原生廣告。如何使用原生廣告管理器請直接參考 [Sample Code]。


# Native Ad Spec {#nativeAdSpec}
--------
`紅色`表示您必須顯示的原生廣告元件，其中 CoverImage 與 Icon 必須至少顯示其中一個。


Properties   |   Description
:-----------:|:-----------:|
<font color="red">AdLabel</font>      | 讓使用者了解此為廣告 (例如：贊助、廣告 等等)
:-----------:|:-----------:|
<font color="red">Title</font>  | 最少需顯示8個中文字, 放不下時須顯示`...`
:-----------:|:-----------:|
CoverImage   | 1200 x 627px (可等比例縮放，不可變形，不可裁切)
:-----------:|:-----------:|
Icon         | 128 x 128px (可等比例縮放，不可變形，不可裁切)
:-----------:|:-----------:|
CallToAction | 需要完整顯示
:-----------:|:-----------:|
BodyText     | 最少顯示20個中文字，或不要顯示
:-----------:|:-----------:|
SocialContext| 需要完整顯示
:-----------:|:-----------:|
RatingScale  | 5
:-----------:|:-----------:|
Rating Min/Max| 1/5
:-----------:|:-----------:|

# Tips
---

### App Transport Security
iOS9 更新了安全條款 App Transport Security (ATS)，請參考 [iOS9 ATS] 來修改部份設定

### Sample Code
本頁以基本的 Native Ad 為例進行說明，如果您想看到完整的串接實例或 `Table View` 的範例，請參考我們的 [Sample Code]

### 其它廣告形式
如果您想了解其它廣告形式的串接，請參考以下內容：

* [橫幅廣告](../banner)
* [插頁廣告](../interstitial)
* [Out-stream 影音廣告](../outstream)
* [中介服務](../mediation)
* [進階設定](../advanced)

### 中介服務
透過中介服務，您的應用程式就能放送眾多來源的廣告，詳細請見說明：<br>
- [使用 AdMob] <br>
- [使用 MoPub] <br>
- [使用 Smaato]

[串接說明]: ../integration-guide/
[Vpon PDMKT Team]: mailto:partner.service@vpon.com
[Sample Code]: ../download/
[iOS9 ATS]: {{site.baseurl}}/zh-tw/ios/latest-news/ios9ats/


[說明]: {{ site.baseurl }}/zh-tw/ios/registration/
[使用 AdMob]: {{ site.baseurl }}/zh-tw/ios/mediation/admob/#customevent
[使用 MoPub]: {{ site.baseurl }}/zh-tw/ios/mediation/mopub
[使用 Smaato]: {{ site.baseurl }}/zh-tw/ios/native/mediation/smaato
[原生廣告 - Table View]: {{site.baseurl}}/zh-tw/ios/native/table/
[基本原生廣告]: #
