---
layout: "ios"
title: "iOS - 原生廣告 (Table View)"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/native/table/
lang: "zh-tw"
---
# 完成串接準備
---
在開始串接廣告之前，請確認您已經將 Vpon SDK 導入您的 Xcode 專案中。若您尚未完成，請先參考[串接說明]完成相關設定。

# 原生廣告選擇
---
Vpon 提供兩種原生廣告的形式：

1. [基本原生廣告]
2. [原生廣告 - Table View]

本頁以原生廣告 - Table View 為例，基本形式的原生廣告可由點擊上方連結獲得更詳細說明。

# 概要
--------
在應用程式中建立原生廣告並以 `Table View` 呈現需要執行以下五個步驟：

1. 匯入 Vpon SDK
2. 初始化 adsManager 並請求廣告
3. 初始化 VpadnNativeAdTableViewAdProvider
4. 實作 UITableViewDataSource 與 UITableViewDelegate Protocol
5. 清除原生廣告

建議您最好在應用程式的 UIViewController 內執行上述所有步驟。

# 開始撰寫 Native Ad - Table View
--------
首先匯入 SDK ，宣告實作以下 Protocols 接收廣告狀態:

1. UITableViewDelegate
2. UITableViewDataSource
3. VpadnNativeAdsManagerDelegate
4. VpadnNativeAdDelegate

宣告 VpadnNativeAdsManager 與 VpadnNativeAdTableViewAdProvider。<br>
VpadnNativeAdsManager 可以協助您一次請求並管理多筆原生廣告；<br>
VpadnNativeAdTableViewAdProvider 可協助您處理在廣告加入 Table View 之後各個 index 的改變。<br>

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

## 初始化 adsManager 並請求廣告
--------
初始化 adsManager，完成指定 License Key ( 尚未申請 License Key 請先參考此[說明] )，並設定 `forNumAdsRequested` (最高可設為 5，表 adsManager 一次請求 5 筆原生廣告)。

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
實作 VpadnNativeAdsManagerDelegate Protocol。完成並且成功請求廣告後，請將 adsManager 的 delegate 設為 nil，並在此初始化 VpadnNativeAdTableViewAdProvider。
完成上述流程後，即可呼叫 `reloadData` 更新 Table View，將廣告填入 Table 中，稍後會繼續說明。

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

## 實作 UITableViewDataSource 與 UITableViewDelegate Protocol
--------
實作這兩個 Protocols 實際上等同於完成以下三個對於 Table View 的流程：

1. 計算 Table Cell 數量 (包含原始 Table 內容與請求成功的廣告數量)
2. 給定 Cell 高度
3. 將 Cell 內容填入

首先透過 kRowStrideForAdCell 可以設定相隔幾個 Cell 要顯示一個 NativeAd；接著實作 UITableViewDelegate 給定每個 Cell 的高度；最後填入 Cell 的內容，假如該索引位置應為正常內容則填入原先 Table 的素材，而如果索引位置應為廣告，透過 CustomCell 中的 setNativeAd 將原生廣告素材填入 Cell。<br>
提醒您在建立適合的原生廣告 UI 時需要符合原生廣告呈現元件規範，請參照[Native Ad Spec](#nativeAdSpec) )。

```objc
#pragma mark - UITableViewDataSource

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [self.ads adjustCount:self.tableViewContents.count forStride:kRowStrideForAdCell] ?:self.tableViewContents.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {

    /* Update Native ads manager
    if (indexPath.row != 0 && indexPath.row % 20 == 0) {
        [self.adsManager loadAdsWithTestIdentifiers:@[@"請填入手機的 IDFA"]];
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

## 清除原生廣告
--------
在 CustomCell 的 setNativeAd 中會判斷該 Cell 內是否已有先前填入的 NativeAd，如果有的話先進行 unregisterView。

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

# 下載範例
--------
本頁以 `Table View` 為例進行說明， [Sample Code] 中另有 `基本原生廣告` 的範例以供參考。<br>


[串接說明]: ../integration-guide/
[說明]: {{ site.baseurl }}/zh-tw/ios/registration/
[Sample Code]: {{ site.baseurl }}/zh-tw/ios/download/
[基本原生廣告]: {{site.baseurl}}/zh-tw/ios/native/
[原生廣告 - Table View]: #
[這篇]: {{site.baseurl}}/zh-tw/ios/latest-news/ios9ats/
