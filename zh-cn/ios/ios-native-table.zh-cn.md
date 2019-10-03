---
layout: "ios"
title: "iOS - 原生广告 (Table View)"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-cn/ios/native/table/
lang: "zh-cn"
---

# 完成串接准备
---
在开始串接广告之前，请确认您已经将 Vpon SDK 导入您的 Xcode 专案中。若您尚未完成，请先参考[串接说明]完成相关设定。

# 原生广告选择
---
Vpon 提供两种原生广告的形式：

1. [基本原生广告]
2. [原生广告 - Table View]

本页以原生广告 - Table View 为例，基本形式的原生广告可由点击上方连结获得更详细说明。

# 概要
--------
在应用程式中建立原生广告并以 `Table View` 呈现需要执行以下五个步骤：

1. 汇入 Vpon SDK
2. 初始化 adsManager 并请求广告
3. 初始化 VpadnNativeAdTableViewAdProvider
4. 实作 UITableViewDataSource 与 UITableViewDelegate Protocol
5. 清除原生广告

建议您最好在应用程式的 UIViewController 内执行上述所有步骤。

# 开始撰写 Native Ad - Table View
--------
首先汇入 SDK ，宣告实作以下 Protocols 接收广告状态:

1. UITableViewDelegate
2. UITableViewDataSource
3. VpadnNativeAdsManagerDelegate
4. VpadnNativeAdDelegate

宣告 VpadnNativeAdsManager 与 VpadnNativeAdTableViewAdProvider。

VpadnNativeAdsManager 可以协助您一次请求并管理多笔原生广告；

VpadnNativeAdTableViewAdProvider 可协助您处理在广告加入 Table View 之后各个 index 的改变。


```objc
@import VpadnSDKAdKit;
#import "TableViewController.h"
#import "CustomCell.h"

static NSInteger const kRowStrideForAdCell = 3;
static NSString *const kDefaultCellIdentifier = @"normalIdentifier";
static NSString *const kAdCellIdentifier = @"adIdentifier";

@interface TableViewController ()<UITableViewDelegate, UITableViewDataSource, VpadnNativeAdsManagerDelegate, VpadnNativeAdDelegate>

@property (strong, nonatomic) VpadnNativeAdsManager *adsManager;
@property (strong, nonatomic) VpadnNativeAdTableViewAdProvider *ads;

@property (strong, nonatomic) NSMutableArray *tableViewContents;

@end
```

## 初始化 adsManager 并请求广告
--------
初始化 adsManager，完成指定 License Key ( 尚未申请 License Key 请先参考此[说明] )，并设定 `forNumAdsRequested` (最高可设为 5，表 adsManager 一次请求 5 笔原生广告)。

```objc
- (void)viewDidLoad {
    [super viewDidLoad];

    if (!self.adsManager) {
        self.adsManager = [[VpadnNativeAdsManager alloc] initWithBannerID:@"License Key" forNumAdsRequested:5];
        self.adsManager.delegate = self;
    }
    [self.adsManager loadAdsWithTestIdentifiers:@[@"49EAAA1A-869E-43D5-BAFD-26839FAEEEDD"]];
}
```

## 初始化 VpadnNativeAdTableViewAdProvider
--------
实作 VpadnNativeAdsManagerDelegate Protocol。完成并且成功请求广告后，请将 adsManager 的 delegate 设为 nil，并在此初始化 VpadnNativeAdTableViewAdProvider。
完成上述流程后，即可呼叫 `reloadData` 更新 Table View，将广告填入 Table 中，稍后会继续说明。

```objc
- (void)onVpadnNativeAdsReceived {
    NSLog(@"Ads did loaded");

    NSLog(@"Unique count %d", self.adsManager.uniqueNativeAdCount);
    VpadnNativeAdsManager *manager = self.adsManager;
    self.adsManager.delegate = nil;
    self.ads = [[VpadnNativeAdTableViewAdProvider alloc] initWithManager:manager];
    self.ads.delegate = self;

    [self.tableView reloadData];
}

- (void)onVpadnNativeAdsFailedToLoadWithError:(NSError *)error {
    NSLog(@"Ads did fail with error %@", error);
}
```

## 实作 UITableViewDataSource 与 UITableViewDelegate Protocol
--------
实作这两个 Protocols 实际上等同于完成以下三个对于 Table View 的流程：

1. 计算 Table Cell 数量 (包含原始 Table 内容与请求成功的广告数量)
2. 给定 Cell 高度
3. 将 Cell 内容填入

首先透过 kRowStrideForAdCell 可以设定相隔几个 Cell 要显示一个 NativeAd；接着实作 UITableViewDelegate 给定每个 Cell 的高度；最后填入 Cell 的内容，假如该索引位置应为正常内容则填入原先 Table 的素材，而如果索引位置应为广告，透过 CustomCell 中的 setNativeAd 将原生广告素材填入 Cell。

提醒您在建立适合的原生广告 UI 时需要符合原生广告呈现元件规范，请参照[Native Ad Spec](#nativeAdSpec) )。

```objc
#pragma mark - UITableViewDataSource

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [self.ads adjustCount:self.tableViewContents.count forStride:kRowStrideForAdCell] ?:self.tableViewContents.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {

    /* Update Native ads manager
    if (indexPath.row != 0 && indexPath.row % 20 == 0) {
        [self.adsManager loadAdsWithTestIdentifiers:@[@"请填入手机的 IDFA"]];
    }
    */

    UITableViewCell *cell;
    if ([self.ads isAdCellAtIndexPath:indexPath forStride:kRowStrideForAdCell]) {

        cell = [tableView dequeueReusableCellWithIdentifier:kAdCellIdentifier forIndexPath:indexPath];
        VpadnNativeAd *ad = [self.ads tableView:tableView nativeAdForRowAtIndexPath:indexPath];
        [(CustomCell *)cell setNativeAd:ad];
        [ad registerViewForInteraction:cell.contentView withViewController:self];
    } else {

        cell = [tableView dequeueReusableCellWithIdentifier:kDefaultCellIdentifier forIndexPath:indexPath];
        NSIndexPath *index = [self.ads adjustNonAdCellIndexPath:indexPath forStride:kRowStrideForAdCell]?: indexPath;
        cell.textLabel.text = [self.tableViewContents objectAtIndex:index.row];
        [cell setBackgroundColor:[UIColor whiteColor]];
    }
    return cell;
}

#pragma mark - UITableViewDelegate

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    return 80;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
}
```

## 清除原生广告
--------
在 CustomCell 的 setNativeAd 中会判断该 Cell 内是否已有先前填入的 NativeAd，如果有的话先进行 unregisterView。

```objc
- (void)setNativeAd:(VpadnNativeAd *)nativeAd {
    if (_nativeAd != nativeAd) {
        [_nativeAd unregisterView];
    }
    ...
}
```

# Navive Ad Spec {#nativeAdSpec}
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
SocialContext| 需要完整显示
:-----------:|:-----------:|
RatingScale  | 5
:-----------:|:-----------:|
Rating Min/Max| 1/5
:-----------:|:-----------:|

# 下载范例
--------
本页以 `Table View` 为例进行说明， [Sample Code] 中另有 `基本原生广告` 的范例以供参考。



[串接说明]: ../integration-guide/
[说明]: {{ site.baseurl }}/zh-cn/ios/registration/
[Sample Code]: {{ site.baseurl }}/zh-cn/ios/download/
[基本原生广告]: {{site.baseurl}}/zh-cn/ios/native/
[原生广告 - Table View]: #
[这篇]: {{site.baseurl}}/zh-cn/ios/latest-news/ios9ats/
