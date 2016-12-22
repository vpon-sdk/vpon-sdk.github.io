---
layout:         "ios"
title:          "iOS - Native Ad (Table View)"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/native/table/
lang:            "en"
---
## Finished Integration Guide
---
If you haven't finished the previous integration guide, please check all the [settings here].

## Latest News
---
Apple recently revised App Transport Security (ATS), to iOS10. Please refer to [this link] for some modification.

# NativeAd Options
---
We support two kinds of Native Ad below:

1. [Basic Native Ad]
2. [Native Ad - Table View]

Here we use the second one as an example to show how to construct a Native ad in Table View. Click the link above to get more detail about the Basic Native Ad.

# Overview
---
Here are five steps to construct Native Ad - Table View :

1. Import Vpon SDK
2. Initialize adsManager & Request ads
3. Initialize VpadnNativeAdTableViewAdProvider
4. Implement UITableViewDataSource & UITableViewDelegate Protocol
5. Unregister the existed native ad.

The best place to do all this is in your app's UIViewController.

# Coding for Showing Native Ad - Table View
---
First, in your View Controller header file, import Vpon SDK and declare that you implement the following protocols:

1. UITableViewDelegate
2. UITableViewDataSource
3. VpadnNativeAdsManagerDelegate
4. VpadnNativeAdDelegate

Declare VpadnNativeAdsManager & VpadnNativeAdTableViewAdProvider. The first one can help for managing multiple native ads, and the second one can handle the changed index while inserting ads into table view.

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

## Initialize adsManager & Request ads
---
Initialize adsManager and set the NativeAd ID (Please click [here] if you still do not get the Native Ad ID). Besides, the parameter `forNumAdsRequested` could handle the number of ads which have been request in adsManager ( 5 would be the maximum of the parameter, it is meant you can request 5 ads each time).

```objc
- (void)viewDidLoad {
    [super viewDidLoad];

    if (!self.adsManager) {
        self.adsManager = [[VpadnNativeAdsManager alloc] initWithBannerID:@"8a80818257ff669e0157ffa7bca60008" forNumAdsRequested:5];
        self.adsManager.delegate = self;
    }
    [self.adsManager loadAdsWithTestIdentifiers:@[@"49EAAA1A-869E-43D5-BAFD-26839FAEEEDD"]];
}
```

## Initialize VpadnNativeAdTableViewAdProvider
---
Finish implementing VpadnNativeAdsManagerDelegate Protocol. After receiving the callback about the success of loading ad, please set the delegate of adsManager into `nil` and initialize VpadnNativeAdTableViewAdProvider.
When finish the above setting, please use the method `reloadData` to renew table view.

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

## Implement UITableViewDataSource & UITableViewDelegate Protocol
---
Implementing these two protocols is equivalent to complete 3 steps showing below:

1. Calculate the number of tabel cell.
2. Set the height of the cell.
3. Fill in contents.

First, you can use `kRowStrideForAdCell` to control the interval between each native ad. Second, set the height of the cell by implementing UITableViewDelegate protocol. At last, distinguish between the normal one or native ad and fill in the suitable conetents.

Please follow the [Natie Ad Spec](#nativeAdSpec) while constructing the customized native ad UI.

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

## Clear Native Ad {#clearNativeAd}
---
Method `setNativeAd` in CustomCell will determine whether there exists native ad in the cell. If so, unregister the original one.

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
`Red Color` indicates the required element in the Native Ad. CoverImage and Icon, at least one of them must be shown.

Properties   |   Description
:-----------:|:-----------:|
<font color="red">AdLabel</font>      | Let user know it is ad.
:-----------:|:-----------:|
<font color="red">Title</font>  | Show at least 16 English alphabets. <br>Show `...` while it's out of space.
:-----------:|:-----------:|
<font color="red">CallToAction</font> | Show completely
:-----------:|:-----------:|
<font color="red">CoverImage</font>   | 1200 x 627px <br>(enable scaling in proportion, without distortion and clipping)
:-----------:|:-----------:|
<font color="red">Icon</font>     | 128 x 128px <br>(enable scaling in proportion, without distortion and clipping)
:-----------:|:-----------:|
BodyText     | Show at least 20 English alphabets or unshow it.
:-----------:|:-----------:|
SocialContext| Show completely
:-----------:|:-----------:|
RatingScale  | 5
:-----------:|:-----------:|
Rating Min/Max| 1/5
:-----------:|:-----------:|

# Download Sample Code
---
Here we use `NativeAd - Table View` as an example. A basic naive ad sample is also in the [Sample Code] <br>


[settings here]: ../integration-guide/
[here]: {{ site.baseurl }}/ios/registration/
[Sample Code]: {{site.dnldurl}}/sample-code/NativeSamplesiOS.zip
[Basic Native Ad]: {{ site.baseurl }}/ios/native/
[Native Ad - Table View]: #
[this link]: ../latest-news/ios10ats/
