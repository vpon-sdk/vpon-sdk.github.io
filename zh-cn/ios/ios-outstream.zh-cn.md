---
layout: "ios"
title: "iOS - Out-stream 影音广告"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/outstream/
lang: "zh-cn"
---
# 概要
---
Vpon Out-stream 影音广告提供串流外的影音广告服务，透过将影音广告嵌入应用程式内容之间，以原生方式呈现广告，同时预设为静音播放，基于用户体验的考量，不影响使用者的阅读状态。

# 完成串接准备
---
在开始串接广告之前，请确认您已经完成以下准备：

1. 将 Vpon SDK 导入您的 Xcode 专案中。若您尚未完成，请先参考[串接说明]完成相关设定。
2. 联系[Vpon PDMKT Team] 完成帐号设定，并取得您的 License Key

# 开始撰写 Out-stream 影音广告
---
请参考以下说明，在应用程式中在自定义的位置上建立 Out-stream 影音广告：

1. Import VpadnSDKAdKit
2. 在应用程式的 ViewController 中宣告 VpadnInReadAd
3. 建立 VpadnInReadAd 物件，并指定 License Key
4. 拉取广告
5. 展示广告
6. 实作 Delegate Protocol

请参考以下范例，完成 Out-stream 影音广告设定：

### Import VpadnSDKAdKit 并宣告 VpadnInReadAd

```objc
@import VpadnSDKAdKit;

@interface VponSdkVastCustomAdViewController () <VpadnInReadAdDelegate>

@property (nonatomic, weak) IBOutlet UIView *videoLoadedView;

// 宣告 VpadnInReadAd
@property (nonatomic, strong) VpadnInReadAd *VpadnInReadAd;

@end
```

### 建立 VpadnInReadAd 物件後指定 License Key，再拉取廣告

```objc
- (void) requestVpadnInReadAd {
    // 請將 License Key 換成 Vpon PDMKT Team 提供您的 License Key
    _VpadnInReadAd = [[VpadnInReadAd alloc] initWithPlacementId:@"License Key" delegate:self];

    // 拉取广告
    [_VpadnInReadAd loadAdWithTestIdentifiers:@[]];

    // 如果要拉取测试广告，请使用以下程式片段，并填入您的测试机 IDFA
    // [_VpadnInReadAd loadAdWithTestIdentifiers:@[@"your_IDFA"]];
}
```

### 展示广告

您可以实作 Delegate Protocol，透过 videoView() 取得广告后，将广告加到您想呈现广告的位置上：

```objc
#pragma mark - VpadnInReadAd Delegate

- (void) VpadnInReadAdDidLoad:(VpadnInReadAd *)ad {
    UIView *videoView = [ad videoView];
    [_videoLoadedView addSubview:videoView];
    
    videoView.translatesAutoresizingMaskIntoConstraints = NO;
    
    [_videoLoadedView addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"V:|-0-[videoView]-0-|" options:0 metrics:nil views:@{@"videoView":videoView}]];
    [_videoLoadedView addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"H:|-0-[videoView]-0-|" options:0 metrics:nil views:@{@"videoView":videoView}]];
}
```

## Interface for Out-stream 影音广告
---
此外，Vpon Out-stream 影音串流广告提供 3 种串流外的影音广告介面，分别为：

1. [InScrollView]
2. [InTableView]
<!-- 3. [InTableView (多次请求)] -->

<img src="{{site.imgurl}}/ios_outstream.png" alt="" class=""/>

请依您的需求选择 Out-stream 影音广告的介面。

## 在 InScrollView 中展示 Out-stream 影音广告 {#inscrollview}
---
在应用程式中的 ScrollView 建立 Out-stream 影音广告需要执行以下步骤：

1. Import VpadnSDKAdKit
2. 在应用程式的 ViewController 中宣告 VpadnInReadAd
3. 建立 VpadnInReadAd 物件，并指定 License Key
4. 拉取广告
5. 实作 Delegate Protocol

请参考以下范例，完成 Out-stream 影音广告设定：

### Import VpadnSDKAdKit 并宣告 VpadnInReadAd

```objc
@import VpadnSDKAdKit;

@interface VponSdkVastInScrollViewController () <VpadnInReadAdDelegate>

// 宣告要呈现广告的 View
@property (nonatomic, weak) IBOutlet UIView *inScrollLoadedView;

// 宣告用来调整广告起始高度的 Constraint
@property (nonatomic, weak) IBOutlet NSLayoutConstraint *inScrollHeightConstraint;

// 宣告要放置广告的 ScrollView
@property (nonatomic, weak) IBOutlet UIScrollView *inScrollView;

// 宣告 VpadnInReadAd
@property (nonatomic, strong) VpadnInReadAd *VpadnInReadAd;

@end
```

### 建立 VpadnInReadAd 物件后指定 License Key，再拉取广告

```objc
- (void) requestVpadnInReadAd {
    // 请将 License Key 换成 Vpon PDMKT Team 提供您的 License Key
    _VpadnInReadAd = [[VpadnInReadAd alloc] initWithPlacementId:@"License Key" placeholder:_inScrollLoadedView heightConstraint:_inScrollHeightConstraint scrollView:_inScrollView delegate:self];
    
    // 拉取广告
    [_VpadnInReadAd loadAdWithTestIdentifiers:@[]];

    // 如果要拉取测试广告，请使用以下程式片段，并填入您的测试机 IDFA
    // [_VpadnInReadAd loadAdWithTestIdentifiers:@[@"your_IDFA"]];
}
```

## 在 InTableView 中展示 Out-stream 影音广告 {#intableview}
---
在应用程式中的 TableView 建立 Out-stream 影音广告需要执行以下步骤：

1. Import VpadnSDKAdKit
2. 在应用程式的 ViewController 中宣告 VpadnInReadAd
3. 建立 VpadnInReadAd 物件，并指定 License Key
4. 拉取广告
5. 实作 Delegate Protocol

请参考以下范例，完成 Out-stream 影音广告设定：

### Import VpadnSDKAdKit 并宣告 VpadnInReadAd

```objc
@import VpadnSDKAdKit;

@interface VponSdkVastInTableViewController () <UITableViewDelegate, UITableViewDataSource, VpadnInReadAdDelegate>

// 宣告要放置广告的 TableView
@property (nonatomic, weak) IBOutlet UITableView *tableView;

// 宣告 VpadnInReadAd
@property (nonatomic, strong) VpadnInReadAd *VpadnInReadAd;

@end
```

### 建立 VpadnInReadAd 物件后指定 License Key，再拉取广告

```objc
- (void) requestVpadnInReadAd {
    // 请将 License Key 换成 Vpon PDMKT Team 提供您的 License Key
    // 修改 insertionIndexPath 参数来指定广告嵌入的位置
    _VpadnInReadAd = [[VpadnInReadAd alloc] initWithPlacementId:@"License Key" insertionIndexPath:[NSIndexPath indexPathForRow:0 inSection:0] tableView:_tableView delegate:self];

    // 拉取广告
    [_VpadnInReadAd loadAdWithTestIdentifiers:@[]];

    // 如果要拉取测试广告，请使用以下程式片段，并填入您的测试机 IDFA
    // [_VpadnInReadAd loadAdWithTestIdentifiers:@[@"your_IDFA"]];
}
```

<!-- ## 在 InTableView 中展示 Out-stream 影音广告 (多次请求) {#intableviewrepeat}
---
在应用程式中的 TableView 建立多个 Out-stream 影音广告需要执行以下步骤：

1. Import `VpadnSDKAdKit`
2. 在应用程式的 ViewController 中宣告 `VpadnInReadAd`
3. 建立 VpadnInReadAd 物件，并指定 License Key
4. 拉取广告
5. 实作 Delegate Protocol

请参考以下范例，完成 Out-stream 影音广告设定：

### Import VpadnSDKAdKit 并宣告 VpadnInReadAd

```objc
@import VpadnSDKAdKit;

@interface VponSdkVastInTableRepeatViewController () <UITableViewDelegate, UITableViewDataSource, VpadnInReadAdDelegate>

// 宣告要放置广告的 TableView
@property (nonatomic, weak) IBOutlet UITableView *tableView;

// 宣告 VpadnInReadAd
@property (nonatomic, strong) VpadnInReadAd *VpadnInReadAd;

@end
```

### 建立 VpadnInReadAd 物件后指定 License Key，再拉取广告

```objc
- (void) requestVpadnInReadAd {
    // 请将 License Key 换成 Vpon PDMKT Team 提供您的 License Key
    // 修改 insertionIndexPath 的参数，指定广告嵌入的位置及再次请求的间隔数
    VpadnInReadAd = [[VpadnInReadAd alloc] initWithPlacementId:@"License Key" insertionIndexPath:[NSIndexPath indexPathForRow:5 inSection:0] repeatMode:YES tableView:_tableView delegate:self];

    // 拉取广告
    [_VpadnInReadAd loadAdWithTestIdentifiers:@[]];

    // 如果要拉取测试广告，请使用以下程式片段，并填入您的测试机 IDFA
    // [_VpadnInReadAd loadAdWithTestIdentifiers:@[@"your_IDFA"]];
}
``` -->

## 实作 Delegate Protocol
---
完成广告初始化后，您可以实作以下函数监听广告状态：

```objc
- (void)vpadnInReadAd:(VpadnInReadAd *)ad didFailLoading:(NSError *)error {
	NSLog(@"广告抓取失败");	
}

- (void)vpadnInReadAdDidLoad:(VpadnInReadAd *)ad {
	NSLog(@"广告抓取成功");
}

- (void)vpadnInReadAdDidStart:(VpadnInReadAd *)ad {
	NSLog(@"影片开始播放");
}

- (void)vpadnInReadAdDidStop:(VpadnInReadAd *)ad {
	NSLog(@"影片播放结束");
}

- (void)vpadnInReadAdDidMute:(VpadnInReadAd *)ad {
	NSLog(@"影片静音");
}

- (void)vpadnInReadAdDidUnmute:(VpadnInReadAd *)ad {
	NSLog(@"影片取消静音");
}

- (void)vpadnInReadAdWasClicked:(VpadnInReadAd *)ad {
	NSLog(@"广告被点击");
}

- (void)vpadnInReadAdDidTakeOverFullScreen:(VpadnInReadAd *)ad {
	NSLog(@"影片全屏");
}

- (void)vpadnInReadAdDidDismissFullscreen:(VpadnInReadAd *)ad {
	NSLog(@"影片离开全屏");
}
```


# Tips
---

### Sample Code
如果您想看到完整的串接实例，请参考我们的 [Sample Code]

### 其它广告形式
如果您想了解其它广告形式的串接，请参考以下内容：

* [横幅广告](../banner)
* [插页广告](../Interstitial)
* [原生广告](../native)
* [中介服务](../mediation)
* [进阶设定](../advanced)


[串接说明]: ../integration-guide/
[Vpon PDMKT Team]: mailto:partner.service@vpon.com
[InScrollView]: {{site.baseurl}}/zh-cn/ios/outstream/#inscrollview
[InTableView]: {{site.baseurl}}/zh-cn/ios/outstream/#intableview
[InTableView (多次请求)]: {{site.baseurl}}/zh-cn/ios/outstream/#intableviewrepeat
[Custom Ad]: {{site.baseurl}}/zh-cn/ios/outstream/#customad
[Sample Code]: ../download/
[iOS9 ATS]: {{site.baseurl}}/zh-cn/ios/latest-news/ios9ats/