---
layout:         "ios"
title:          "iOS - Out-stream Video Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/outstream/
lang:            "en"
---
# Overview
---
Vpon provide Out-stream Video Ad which served outside of a stream video. To optimize ad display performance, Out-stream Video Ad will show as native content and typically without sound to minimize the impact of user experience.

# Prerequisites
---
Before you start to integrate Out-stream Video Ad, please make sure you already finished the items below:

1. Import Vpon SDK to your Xcode project. If you haven't done yet, please refer to our [Integration Guide]({{site.baseurl}}/ios/integration-guide/) to finish your setting.
2. Contact [Vpon PDMKT Team] to set up your account and get your License Key.

# Start To Implement Out-stream Video Ad
---
Please follow the steps below to implement Out-stream Video Ad to your application:

1. Import VpadnSDKAdKit
2. Declare a VpadnInReadAd instance
3. Set up VpadnInReadAd object and indicate a License Key
4. Request for an Out-stream Video Ad
5. Show Out-stream Video Ad
6. Set up Delegate Protocol

Please refer to the sample code below to finish your Out-stream Video Ad setting:

```objc
@import VpadnSDKAdKit;

@interface VponSdkVastCustomAdViewController () <VpadnInReadAdDelegate>

@property (nonatomic, weak) IBOutlet UIView *videoLoadedView;

// Declare a VpadnInReadAd instance
@property (nonatomic, strong) VpadnInReadAd *VpadnInReadAd;

@end
```

### Set Up VpadnInReadAd Object And Indicate A License Key
```objc
- (void) requestVpadnInReadAd {
    // Please replace "License Key" with the one you receive from Vpon PDMKT Team
    _VpadnInReadAd = [[VpadnInReadAd alloc] initWithPlacementId:@"License Key" delegate:self];
    
    // Request Vpon Out-stream Video Ad
    [_VpadnInReadAd loadAdWithTestIdentifiers:@[]];

    // Please use the code snippet below and fill in with your test device's IDFA if you want to request for a test ad
    // [_VpadnInReadAd loadAdWithTestIdentifiers:@[@"your_IDFA"]];
}
```

### Show Custom Out-stream Ad

After receiving ad with videoView(), you can embed the Out-stream Video Ad to the position where you want to display the ad.

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

Interface for Out-stream Video Ad
---
Vpon provide 3 kinds of interface for Out-stream Video Ad, you can choose the one that match your requirement:

1. [InScrollView]
2. [InTableView]
<!-- 3. [InTableView (Multiple Request)] -->

<img src="{{site.imgurl}}/ios_outstream.png" alt="" class=""/>

## Show Out-stream Video Ad in InScrollView {#inscrollview}
---
To set up an Out-stream Video Ad in a ScrollView of the application, please follow the steps below:

1. Import VpadnSDKAdKit
2. Declare a VpadnInReadAd instance
3. Set up VpadnInReadAd object and indicate a License Key
4. Request for an Out-stream Video Ad
5. Set up Delegate Protocol

Please refer to the sample code below to finish your Out-stream Video Ad setting:

### Import VpadnSDKAdKit And Declare VpadnInReadAd

```objc
@import VpadnSDKAdKit;

@interface VponSdkVastInScrollViewController () <VpadnInReadAdDelegate>

// Declare a View that will show the ad
@property (nonatomic, weak) IBOutlet UIView *inScrollLoadedView;

// Declare a Constraint to control the height where the ad view start
@property (nonatomic, weak) IBOutlet NSLayoutConstraint *inScrollHeightConstraint;

// Declare a ScrollView for ad display
@property (nonatomic, weak) IBOutlet UIScrollView *inScrollView;

// Declare a VpadnInReadAd instance
@property (nonatomic, strong) VpadnInReadAd *VpadnInReadAd;

@end
```


### Set Up VpadnInReadAd Object And Indicate A License Key
```objc
- (void) requestVpadnInReadAd {
    // Please replace "License Key" with the one you receive from Vpon PDMKT Team
    _VpadnInReadAd = [[VpadnInReadAd alloc] initWithPlacementId:@"License Key" placeholder:_inScrollLoadedView heightConstraint:_inScrollHeightConstraint scrollView:_inScrollView delegate:self];
    
    // Request Vpon Out-stream Video Ad
    [_VpadnInReadAd loadAdWithTestIdentifiers:@[]];

    // Please use the code snippet below and fill in with your test device's IDFA if you want to request for a test ad
    // [_VpadnInReadAd loadAdWithTestIdentifiers:@[@"your_IDFA"]];
}
```

## Show Out-stream Video Ad in InTableView {#intableview}
---
To set up an Out-stream Video Ad in a TableView of the application, please follow the steps below:

1. Import VpadnSDKAdKit
2. Declare a VpadnInReadAd instance
3. Set up VpadnInReadAd object and indicate a License Key
4. Request for an Out-stream Video Ad
5. Set up Delegate Protocol

Please refer to the sample code below to finish your Out-stream Video Ad setting:

```objc
@import VpadnSDKAdKit;

@interface VponSdkVastInTableViewController () <UITableViewDelegate, UITableViewDataSource, VpadnInReadAdDelegate>

// Declare a TableView for ad display
@property (nonatomic, weak) IBOutlet UITableView *tableView;

// Declare a VpadnInReadAd instance
@property (nonatomic, strong) VpadnInReadAd *VpadnInReadAd;

@end
```

### Set Up VpadnInReadAd Object And Indicate A License Key
```objc
- (void) requestVpadnInReadAd {
    // Please replace "License Key" with the one you receive from Vpon PDMKT Team
    // Modify the parameters of insertionIndexPath to decide the position that will embed the ad
    _VpadnInReadAd = [[VpadnInReadAd alloc] initWithPlacementId:@"License Key" insertionIndexPath:[NSIndexPath indexPathForRow:0 inSection:0] tableView:_tableView delegate:self];
    
    // Request Vpon Out-stream Video Ad
    [_VpadnInReadAd loadAdWithTestIdentifiers:@[]];

    // Please use the code snippet below and fill in with your test device's IDFA if you want to request for a test ad
    // [_VpadnInReadAd loadAdWithTestIdentifiers:@[@"your_IDFA"]];
}
```

<!-- ## Show Out-stream Video Ad in InTableView (Multiple Request) {#intableviewrepeat}
---
To set up multiple Out-stream Video Ads in a TableView of the application, please follow the steps below:

1. Import `VpadnSDKAdKit`
2. Declare a `VpadnInReadAd` instance
3. Set up VpadnInReadAd object and indicate a License Key
4. Request for an Out-stream Video Ad
5. Set up Delegate Protocol

Please refer to the sample code below to finish your Out-stream Video Ad setting:

```objc
@import VpadnSDKAdKit;

@interface VponSdkVastInTableViewController () <UITableViewDelegate, UITableViewDataSource, VpadnInReadAdDelegate>

// Declare a TableView for ad display
@property (nonatomic, weak) IBOutlet UITableView *tableView;

// Declare a VpadnInReadAd instance
@property (nonatomic, strong) VpadnInReadAd *VpadnInReadAd;

@end
```

### Set Up VpadnInReadAd Object And Indicate A License Key
```objc
- (void) requestVpadnInReadAd {
    // Please replace "License Key" with the one you receive from Vpon PDMKT Team
    // Modify the parameters of insertionIndexPath to decide the position that will embed the ad and the sequence of ad request
    VpadnInReadAd = [[VpadnInReadAd alloc] initWithPlacementId:@"License Key" insertionIndexPath:[NSIndexPath indexPathForRow:5 inSection:0] repeatMode:YES tableView:_tableView delegate:self];
    
    // Request Vpon Out-stream Video Ad
    [_VpadnInReadAd loadAdWithTestIdentifiers:@[]];

    // Please use the code snippet below and fill in with your test device's IDFA if you want to request for a test ad
    // [_VpadnInReadAd loadAdWithTestIdentifiers:@[@"your_IDFA"]];
}
``` -->


## Set Up Delegate Protocol
---
After finishing ad request, implement the delegate protocol as below to listen ad status.

```objc
- (void)vpadnInReadAd:(VpadnInReadAd *)ad didFailLoading:(NSError *)error {
	NSLog(@"VpadnInReadAdFailed");	
}

- (void)vpadnInReadAdDidLoad:(VpadnInReadAd *)ad {
	NSLog(@"VpadnInReadAdDidLoad");
}

- (void)vpadnInReadAdDidStart:(VpadnInReadAd *)ad {
	NSLog(@"VpadnInReadAdDidStart");
}

- (void)vpadnInReadAdDidStop:(VpadnInReadAd *)ad {
	NSLog(@"VpadnInReadAdDidStop");
}

- (void)vpadnInReadAdDidMute:(VpadnInReadAd *)ad {
	NSLog(@"VpadnInReadAdDidMute");
}

- (void)vpadnInReadAdDidUnmute:(VpadnInReadAd *)ad {
	NSLog(@"VpadnInReadAdDidUnmute");
}

- (void)vpadnInReadAdWasClicked:(VpadnInReadAd *)ad {
	NSLog(@"VpadnInReadAdWasClicked");
}

- (void)vpadnInReadAdDidTakeOverFullScreen:(VpadnInReadAd *)ad {
	NSLog(@"VpadnInReadAdDidTakeOverFullScreen");
}

- (void)vpadnInReadAdDidDismissFullscreen:(VpadnInReadAd *)ad {
	NSLog(@"VpadnInReadAdDidDismissFullscreen");
}
```

# Tips
---

### Sample Code
Please refer to our [Sample Code] for a complete integration sample.

### Other Tips
Please refer to the link below to learn more about other ad types:

* [Banner Ad](../banner)
* [Interstitial Ad](../Interstitial)
* [Native Ad](../native)
* [Mediation](../mediation)
* [Advanced](../advanced)

[Vpon PDMKT Team]: mailto:partner.service@vpon.com
[InScrollView]: {{site.baseurl}}/ios/outstream/#inscrollview
[InTableView]: {{site.baseurl}}/ios/outstream/#intableview
[InTableView (Multiple Request)]: {{site.baseurl}}/ios/outstream/#intableviewrepeat
[Custom Ad]: {{site.baseurl}}/ios/outstream/#customad
[Sample Code]: ../download/
[iOS9 ATS]: ../latest-news/ios9ats/