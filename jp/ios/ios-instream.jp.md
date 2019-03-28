---
layout:         "ios"
title:          "iOS - In-stream Video Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /jp/ios/instream/
lang:            "jp"
---
# Overview
---
Vpon provide In-stream Video Ad which can help to maximum your monetization with your video traffic.

# Prerequisites {#prerequisites}
---
Before you begin to integrate Vpon In-stream Video Ad, you’ll need the following:

1. Contact [Vpon BD] to set up your account and get your License Key.
2. Prepare your own VAST / VPAID complicant video player. (Strongly recommneded that your video player is integrated with [Google IMA SDK].)
3. Contact [Vpon BD] to get an ad request URL from Vpon.

# Integrate Vpon In-stream Video Ad
---
You don't need to add additional Vpon SDK to integrate Vpon In-stream Video Ad. If you already set up your video player with [Google IMA SDK], we suggest that you can manage your ad request via Google Ad Manager.

Here is an instruction of how to set up your In-stream Video Ad on Google Ad Manager. Please follow the tips below to finish your Google Ad Manager setting after you finish [Prerequisites].

1. Add [Google Mobile Ads SDK] to your project
2. Create a Ad Unit for In-stream Video Ad
3. Create a Line Item for In-stream Video Ad
4. Add Video Creatives

> **Note**: Besides, you can also use `S2S` to request Vpon In-stream Video Ad directly. For S2S integration, please refer to [Advanced Setting].

## Create a Ad Unit for In-stream Video Ad
---
First, you need to add an ad unit for video ads on your Google Ad Manager.

Click [Inventory]→[Ad Unit] to create new ad unit. You need to insert an unique name for the ad unit. Then click `Video (VAST) sizes` to expand the options for video ad unit. Please choose a size for your requirement.
<img src="{{site.imgurl}}/instream_15.png" alt="" class="width-600"/>
Click `GENERATE TAGS` to generate a set of ad tags for ad request.
<img src="{{site.imgurl}}/instream_16.png" alt="" class="width-600"/>
Choose `Google Publisher Tag for Video` for tag type.
<img src="{{site.imgurl}}/instream_17.png" alt="" class="width-600"/>
Choose Player SDK type for tag options. Click "Enable for live traffic" if your video type is livestream.
<img src="{{site.imgurl}}/instream_18.png" alt="" class="width-600"/>
Edit your tag parameters. Description URL is required. Please fill in with the URL of the page that you will put your video player.
<img src="{{site.imgurl}}/instream_19.png" alt="" class="width-600"/>
Click `Continue` to generate tag.
<img src="{{site.imgurl}}/instream_20.png" alt="" class="width-600"/>
Please add `idtype`, `rdid` and `is_lat` after the ad tag and use `&` to separate each of them as the sample below. And add the full tag to your App Project for your In-stream Video Ad Request.

> https://AdTagFromAdManager<font color="red">&idtype=idfa&rdid=123E4567-E89B-12D3-A456-426655440000&is_lat=0

* Please refer to [Pass resettable device identifiers for user targeting] for the definition of idtype, rdid and is_lat.
* For `idtype` in iOS platform, please fill in `idfa`.
* If you don't know how to get the `rdid(IDFA) and `is_lat` from iOS device, please refer to [How to get iOS IDFA].


## Create a Line Item for In-stream Video Ad
---
After finishing your ad tag, you need to create a line item for your ad unit.

Click [Delivery]→[Orders] to create orders. Fill in Name and Advertiser for it.
<img src="{{site.imgurl}}/instream_21.png" alt="" class="width-600"/>
Then you need to finish your line item. Name the line item and click `Video Vast` to choose the inventory size for the line item.
<img src="{{site.imgurl}}/instream_22.png" alt="" class="width-600"/>
Please set start time and end time for the ad campaign that meet your needs. Also, you can adjust your delivery setting here.
<img src="{{site.imgurl}}/instream_23.png" alt="" class="width-600"/>
Add your targeting. Google Ad Manager will list the ad units based on the inventory size you chose for the line item. Choose the ad units you'll use to deliver In-stream Video Ads.
<img src="{{site.imgurl}}/instream_24.png" alt="" class="width-600"/>
Save your setting after finishing the line item. Ads won't be delivered before you `APPROVE` your order and add creatives for your line item.
<img src="{{site.imgurl}}/instream_25.png" alt="" class="width-600"/>

## Add Video Creatives
---
Add video creatives for your line item.Please click `Add creative sets` in your video line item, you can add new creative or use an existing one.
<img src="{{site.imgurl}}/instream_26.png" alt="" class="width-600"/>
Add new creative set. Name the creative and choose `Redirect`.
<img src="{{site.imgurl}}/instream_27.png" alt="" class="width-600"/>
Please insert the ad request URL from Vpon and ad duration (e.g. 30, 60) for your needs. Save your setting after you finish it.
<img src="{{site.imgurl}}/instream_28.png" alt="" class="width-600"/>

## How to get iOS IDFA {#getidfa}
---
You can implement the code snippet as below to get IDFA from user:

```objc
#import <AdSupport/AdSupport.h>
NSString *advertisingId = [[ASIdentifierManager sharedManager].advertisingIdentifier UUIDString];
BOOL is_lat = [ASIdentifierManager sharedManager].advertisingTrackingEnabled;
```

# Advanced Setting {#s2s}
---
Besides of integrate Vpon In-stream Video Ad with Google Ad Manager, you can also use S2S to integrate it. After you finish [Prerequisites], please refer to [Vpon In-stream Video Ad Guideline] to compose your own ad request URL to request In-stream Video Ad from Vpon.



[Vpon BD]: mailto:bd@vpon.com
[Google IMA SDK]: https://developers.google.com/interactive-media-ads/docs/sdks/ios/
[Google Mobile Ads SDK]: https://developers.google.com/mobile-ads-sdk/docs/dfp/ios/download
[Prerequisites]: {{site.baseurl}}/jp/ios/instream/#prerequisites
[Advanced Setting]: {{site.baseurl}}/jp/ios/instream/#s2s
[Vpon In-stream Video Ad Guideline]: {{site.dnldurl}}/Vpon_In_stream_Video_Ad_Guideline.pdf
[Pass resettable device identifiers for user targeting]: https://support.google.com/admanager/answer/6238701?hl=en
[How to get iOS IDFA]:{{site.baseurl}}/jp/ios/instream/#getidfa