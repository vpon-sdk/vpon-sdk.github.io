---
layout:         "android"
title:          "Android - Google Ad Manager"
lead:           "android mediation"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/mediation/dfp/
lang:           "en"
---
# Latest Information
---
According to [Google Ad Manager's announcement](https://support.google.com/admanager/answer/9020684), Google Ad Manager will deprecate SDK Mediation in Creatives. Please refer to [Create and manage yield groups](https://support.google.com/admanager/answer/7390828) to finish mediation setting in Yield Group.


# General
---
Please make sure you've added following files in your project:

1. Google Mobile Ads SDK
2. Vpon SDK
3. Vpon AdMob Adapter

>**Note:** For Vpon SDK and Vpon AdMob Adapter, please [download here][1].


# Set Up Ad Unit
---

## Banner Ad
Please refer to [Google Ad Manager SDK Integration Guide](https://developers.google.com/ad-manager/mobile-ads-sdk/android/banner#banner_sizes) to determine the size of the ad unit.

## Interstitial Ad
Interstitial ad units can be defined with one of the four common sizes, regardless of the actual screen size of individual devices. The SDK will handle rendering the creative correctly on screens which are of slightly different sizes.

* Cell phone：320x480 (portrait)、480x320 (landscape)
* Tablet：768x1024 (portrait)、1024x768 (landscape)

There is no need to define a separate ad unit for landscape mode. You can simply add the landscape size (e.g. 480x320 for smartphones) to line items targeting the interstitial ad unit and include a creative with the landscape size in addition to the regular portrait size.

## Native Ad
Please set up the ad unit size as your requirement.


# Generate Ad Tags
---
After finishing your ad unit setting, please choose an ad unit and click Generate Tags to generate ad tags. Choose `Mobile application` and get the ad unit like: `/networkCode/adUnitName`. Please apply this tag into your App project.

![DFP 廣告空間]

# Yield Group Setting
---

## Create A Yield Partner

Please follow the steps below to add Vpon as your Yield Partner first in to Company page under Management tag:

1. Choose to create a new company (Ad Network) as your Yield Partner
2. Choose Vpon in the drop list of Ad Network
3. Insert the optional information and save your change


## Set Up Yield Group

Please refer to the instruction below to finish the Yield Group setting:

1. Create new Yield Gruop
2. Determine the ad format and the inventory type for your requirement
3. Determine the ad unit for develiering
4. Finish the optional setting for your requirement
5. Choose to add additional third-party yield partners, and add Vpon from the drop list
6. Determine the integration type:
* Choose `Mobile SDK` if you are trying to integrate `Banner Ad` or `Interstitial Ad`. Please insert `TW` in the Zone column, and insert your `Vpon License Key` in the Vpon Ad ID column.
* Chhose `Custom Event` if you are trying to integrate `Native Ad`. Please insert `GADVpadnNativeAdCustomEvent` in the Class Name column, and insert your `Vpon License Key` in the Parameter column.
7. Save your change



# Tips
---

### Sample Code
Please refer to our [Sample Code] for a complete integration sample.


[integration guide]: ../../integration-guide
[Sample Code]: {{site.baseurl}}/android/download/#dfp
[Here]: https://www.google.com/dfp/
[DFP 廣告空間]: {{site.imgurl}}/AppAdManager_03.png
[DFP_Partner_English.png]: {{site.imgurl}}/DFP_Partner_English.png
[新增指定目標]: {{site.imgurl}}/AddTargeting.png
[廣告素材類型]: {{site.imgurl}}/SDKMediation.png
[Warning]: {{site.imgurl}}/DFP_EN2.png
[插頁尺寸]: {{site.imgurl}}/dfp_interstitial.png

[1]: {{site.baseurl}}/android/download