---
layout: "ios"
title: "iOS - 原生廣告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/native/
lang: "zh-tw"
---

# 概要
--------
原生廣告不同於橫幅廣告、插頁廣告會直接提供可立即呈現的廣告內容，原生廣告 API 提供了標題、圖像等廣告內容的組合，您可以透過這些屬性的編排打造出最理想的原生廣告風格。原生廣告更打破以往對於廣告的刻板印象，以最自然的方式呈現，提供更符合需求的廣告體驗。

<img src="{{site.imgurl}}/Native_iOS.PNG" alt="" class="width-300"/>

# 完成串接準備
---
在開始串接廣告之前，請確認您已經將 Vpon SDK 導入您的 Xcode 專案中。若您尚未完成，請先參考[串接說明]完成相關設定。

# 開始撰寫 Native Ad
--------
在應用程式中建立原生廣告需要執行以下五個步驟：

1. Import VpadnSDKAdKit
2. 宣告 VpadnNativeAd 及自定義 UI
3. 初始化 VpadnNativeAd 物件，並指定 License Key
4. 建立 VpadnRequest 物件，並請求廣告
5. 利用回傳的資料建置自訂的原生 UI
6. 實作 Delegate protocol

建議您可以在應用程式的 ViewController 內執行上述步驟。


## Import VpadnSDKAdKit 並宣告 VpadnNativeAd
---

首先匯入 SDK ，宣告實作了 VpadnNativeAdDelegate, VpadnMediaViewDelegate protocol 以接收廣告狀態，同時也宣告了欲在原生廣告中呈現的各種元件。( 原生廣告呈現元件規範請參照[Native Ad Spec](#nativeAdSpec) )


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
請參考以下程式碼初始化原生廣告，並指定 License Key

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

## 建立 VpadnRequest 物件，並請求廣告
---
在發出廣告請求前，請先建立 VpadnRequest 物件：

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
>* 您可以為每種類型的廣告都建立不同的 VpadnRequest 物件，或是在所有的廣告請求中都使用同一個 VpadnRequest 物件
>* 如果您想要指定更多投放條件，請參考[進階設定](../advanced)


## 自訂原生廣告 UI
---
當 onVpadnNativeAdReceived 被觸發時，即取得可用的廣告資料，此時可將資料佈局至自定義的UI，請參考以下程式碼：

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

## 實作 Delegate protocol
---
完成廣告請求後，您可以實作以下函數監聽廣告狀態：

### Objective-C

```objc
- (void) onVpadnNativeAdLoaded:(VpadnNativeAd *)nativeAd {
    // Invoked if receive Banner Ad successfully

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
        // Invoked if receive Banner Ad successfully

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
<!-- 
# 原生廣告管理器
--------
Vpon SDK 提供原生廣告管理器( Native Ads Manager )。當您設計的 App 中會在短時間內在數個地方顯示原生廣告，原生廣告管理器可以協助您一次請求並管理多筆原生廣告。如何使用原生廣告管理器請直接參考 [Sample Code]。 -->


# Navive Ad Spec {#nativeAdSpec}
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
SocialContext| 需要完整顯示 <br> *適用於 SDK v4.9.3 及以下版本*
:-----------:|:-----------:|
RatingScale  | 5，可能為空值
:-----------:|:-----------:|
Rating Min/Max| 1/5，可能為空值
:-----------:|:-----------:|

# Tips
---

### Sample Code
本頁以基本的 Native Ad 為例進行說明，如果您想看到完整的串接實例或 `Table View` 的範例，請參考我們的 [Sample Code]

### 中介服務
透過中介服務，您的應用程式就能放送眾多來源的廣告，詳細請見說明：<br>
- [使用 AdMob] <br>
- [使用 MoPub] <br>
- [使用 Smaato]

### 適用於 Vpon SDK v4.9 的串接方法
如果您想了解 Vpon SDK v4.9.4 或以下版本的串接方法，請參考[原生廣告](../native-under5)

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
