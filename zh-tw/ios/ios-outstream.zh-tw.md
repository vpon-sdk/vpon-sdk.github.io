---
layout: "ios"
title: "iOS - Out-stream 影音廣告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/outstream/
lang: "zh-tw"
---
# 概要
---
Vpon Out-stream 影音廣告提供串流外的影音廣告服務，透過將影音廣告嵌入應用程式內容之間，以原生方式呈現廣告，同時預設為靜音播放，基於使用者體驗的考量，不影響使用者的閱讀狀態。

# 完成串接準備
---
在開始串接廣告之前，請確認您已經完成以下準備：

1. 將 Vpon SDK 導入您的 Xcode 專案中，若您尚未完成，請先參考[串接說明]完成相關設定
2. 聯繫 [Vpon BD] 完成帳號設定，並取得您的 License Key

# 開始撰寫 Out-stream 影音廣告
---
Vpon Out-stream 影音串流廣告提供 3 種串流外的影音廣告形式，分別為：

1. [InScrollView]
2. [InTableView (單次請求)]
3. [InTableView (多次請求)]

<!-- <img src="{{site.imgurl}}/ios_outstream.png" alt="" class=""/> -->

您可以依您的需求選擇 Out-stream 影音廣告的形式，或者，您也可以將 Out-stream 影音廣告放在應用程式中任何您想放置的位置上，請參考 [Custom Ad]。

## 在 InScrollView 中展示 Out-stream 影音廣告 {#inscrollview}
---
在應用程式中的 ScrollView 建立 Out-stream 影音廣告需要執行以下步驟：

1. Import `VpadnSDKAdKit`
2. 在應用程式的 ViewController 中宣告 `VpadnAd`
3. 建立 VpadnAd 物件，並指定 License Key
4. 拉取廣告
5. 實作 Delegate Protocol

請參考以下範例，完成 Out-stream 影音廣告設定：

### Import VpadnSDKAdKit 並宣告 VpadnAd

```objc
@import VpadnSDKAdKit;

@interface VponSdkVastInScrollViewController () <VpadnAdDelegate>

// 宣告要呈現廣告的 View
@property (nonatomic, weak) IBOutlet UIView *inScrollLoadedView;

// 宣告用來調整廣告起始高度的 Constraint
@property (nonatomic, weak) IBOutlet NSLayoutConstraint *inScrollHeightConstraint;

// 宣告要放置廣告的 ScrollView
@property (nonatomic, weak) IBOutlet UIScrollView *inScrollView;

// 宣告 VpadnAd
@property (nonatomic, strong) VpadnAd *vpadnAd;

@end
```

### 建立 VpadnAd 物件後指定 License Key，再拉取廣告

```objc
- (void) requestVpadnAd {
    // 請將 License Key 換成 Vpon BD 提供您的 License Key
    _vpadnAd = [[VpadnAd alloc] initWithPlacementId:@"License Key" placeholder:_inScrollLoadedView heightConstraint:_inScrollHeightConstraint scrollView:_inScrollView delegate:self];
    
    // 拉取廣告
    [_vpadnAd loadAdWithTestIdentifiers:@[]];
}
```

## 在 InTableView 中展示 Out-stream 影音廣告 (單次請求) {#intableview}
---
在應用程式中的 TableView 建立 Out-stream 影音廣告需要執行以下步驟：

1. Import `VpadnSDKAdKit`
2. 在應用程式的 ViewController 中宣告 `VpadnAd`
3. 建立 VpadnAd 物件，並指定 License Key
4. 拉取廣告
5. 實作 Delegate Protocol

請參考以下範例，完成 Out-stream 影音廣告設定：

### Import VpadnSDKAdKit 並宣告 VpadnAd

```objc
@import VpadnSDKAdKit;

@interface VponSdkVastInTableViewController () <UITableViewDelegate, UITableViewDataSource, VpadnAdDelegate>

// 宣告要放置廣告的 TableView
@property (nonatomic, weak) IBOutlet UITableView *tableView;

// 宣告 VpadnAd
@property (nonatomic, strong) VpadnAd *vpadnAd;

@end
```

### 建立 VpadnAd 物件後指定 License Key，再拉取廣告

```objc
- (void) requestVpadnAd {
    // 請將 License Key 換成 Vpon BD 提供您的 License Key
    // 修改 insertionIndexPath 參數來指定廣告嵌入的位置
    _vpadnAd = [[VpadnAd alloc] initWithPlacementId:@"License Key" insertionIndexPath:[NSIndexPath indexPathForRow:0 inSection:0] tableView:_tableView delegate:self];

    // 拉取廣告
    [_vpadnAd loadAdWithTestIdentifiers:@[]];
}
```

## 在 InTableView 中展示 Out-stream 影音廣告 (多次請求) {#intableviewrepeat}
---
在應用程式中的 TableView 建立多個 Out-stream 影音廣告需要執行以下步驟：

1. Import `VpadnSDKAdKit`
2. 在應用程式的 ViewController 中宣告 `VpadnAd`
3. 建立 VpadnAd 物件，並指定 License Key
4. 拉取廣告
5. 實作 Delegate Protocol

請參考以下範例，完成 Out-stream 影音廣告設定：

### Import VpadnSDKAdKit 並宣告 VpadnAd

```objc
@import VpadnSDKAdKit;

@interface VponSdkVastInTableRepeatViewController () <UITableViewDelegate, UITableViewDataSource, VpadnAdDelegate>

// 宣告要放置廣告的 TableView
@property (nonatomic, weak) IBOutlet UITableView *tableView;

// 宣告 VpadnAd
@property (nonatomic, strong) VpadnAd *vpadnAd;

@end
```

### 建立 VpadnAd 物件後指定 License Key，再拉取廣告

```objc
- (void) requestVpadnAd {
    // 請將 License Key 換成 Vpon BD 提供您的 License Key
    // 修改 insertionIndexPath 的參數，指定廣告嵌入的位置及再次請求的間隔數
    vpadnAd = [[VpadnAd alloc] initWithPlacementId:@"License Key" insertionIndexPath:[NSIndexPath indexPathForRow:5 inSection:0] repeatMode:YES tableView:_tableView delegate:self];

    // 拉取廣告
    [_vpadnAd loadAdWithTestIdentifiers:@[]];
}
```

## Custom Ad {#customad}
---
在應用程式中在自定義的位置上建立 Out-stream 影音廣告需要執行以下步驟：

1. Import `VpadnSDKAdKit`
2. 在應用程式的 ViewController 中宣告 `VpadnAd`
3. 建立 VpadnAd 物件，並指定 License Key
4. 拉取廣告
5. 展示廣告
6. 實作 Delegate Protocol

請參考以下範例，完成 Out-stream 影音廣告設定：

### Import VpadnSDKAdKit 並宣告 VpadnAd

```objc
@import VpadnSDKAdKit;

@interface VponSdkVastCustomAdViewController () <VpadnAdDelegate>

@property (nonatomic, weak) IBOutlet UIView *videoLoadedView;

// 宣告 VpadnAd
@property (nonatomic, strong) VpadnAd *vpadnAd;

@end
```

### 建立 VpadnAd 物件後指定 License Key，再拉取廣告

```objc
- (void) requestVpadnAd {
    // 請將 License Key 換成 Vpon BD 提供您的 License Key
    _vpadnAd = [[VpadnAd alloc] initWithPlacementId:@"License Key" delegate:self];

    // 拉取廣告
    [_vpadnAd loadAdWithTestIdentifiers:@[]];
}
```

### 展示廣告

您可以實作 Delegate Protocol，透過 videoView() 取得廣告後，將廣告加到您想呈現廣告的位置上：

```objc
#pragma mark - VpadnAd Delegate

- (void) vpadnAdDidLoad:(VpadnAd *)ad {
    UIView *videoView = [ad videoView];
    [_videoLoadedView addSubview:videoView];
    
    videoView.translatesAutoresizingMaskIntoConstraints = NO;
    
    [_videoLoadedView addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"V:|-0-[videoView]-0-|" options:0 metrics:nil views:@{@"videoView":videoView}]];
    [_videoLoadedView addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"H:|-0-[videoView]-0-|" options:0 metrics:nil views:@{@"videoView":videoView}]];
}
```

## 實作 Delegate Protocol
---
完成廣告初始化後，您可以實作以下函數監聽廣告狀態：

```objc
- (void)vpadnAd:(VpadnAd *)ad didFailLoading:(NSError *)error {
	NSLog(@"廣告抓取失敗");	
}

- (void)vpadnAdDidLoad:(VpadnAd *)ad {
	NSLog(@"廣告抓取成功");
}

- (void)vpadnAdDidStart:(VpadnAd *)ad {
	NSLog(@"影片開始播放");
}

- (void)vpadnAdDidStop:(VpadnAd *)ad {
	NSLog(@"影片播放結束");
}

- (void)vpadnAdDidMute:(VpadnAd *)ad {
	NSLog(@"影片靜音");
}

- (void)vpadnAdDidUnmute:(VpadnAd *)ad {
	NSLog(@"影片取消靜音");
}

- (void)vpadnAdWasClicked:(VpadnAd *)ad {
	NSLog(@"廣告被點擊");
}

- (void)vpadnAdDidTakeOverFullScreen:(VpadnAd *)ad {
	NSLog(@"影片全屏");
}

- (void)vpadnAdDidDismissFullscreen:(VpadnAd *)ad {
	NSLog(@"影片離開全屏");
}
```

# Tips
---

### App Transport Security
iOS9 更新了安全條款 App Transport Security (ATS)，請參考 [iOS9 ATS] 來修改部份設定

### Sample Code
如果您想看到完整的串接實例，請參考我們的 [Sample Code]

### 其它廣告形式
如果您想了解其它廣告形式的串接，請參考以下內容：

* [橫幅廣告](../banner)
* [插頁廣告](../interstitial)
* [原生廣告](../native)
* [中介服務](../mediation)
* [進階設定](../advanced)

[串接說明]: ../integration-guide/
[Vpon BD]: mailto:bd@vpon.com
[InScrollView]: {{site.baseurl}}/zh-tw/ios/outstream/#inscrollview
[InTableView (單次請求)]: {{site.baseurl}}/zh-tw/ios/outstream/#intableview
[InTableView (多次請求)]: {{site.baseurl}}/zh-tw/ios/outstream/#intableviewrepeat
[Custom Ad]: {{site.baseurl}}/zh-tw/ios/outstream/#customad
[Sample Code]: ../download/
[iOS9 ATS]: {{site.baseurl}}/zh-tw/ios/latest-news/ios9ats/