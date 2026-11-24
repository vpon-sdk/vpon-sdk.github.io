---
layout:         "ios"
title:          "iOS - Google Ad Manager"
lead:           "iOS mediation"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/mediation/dfp/
lang:           "en"
---
> **Note:** In Google Ad Manager, configure mobile app mediation via **Yield Groups**. Please refer to [Create and manage yield groups](https://support.google.com/admanager/answer/7390828) for details.


# General
---
Please make sure you've added following files in your project:

1. Google Mobile Ads SDK
2. Vpon SDK
3. Vpon AdMob Adapter

And please refer to our [Integration Guide] to initial Vpon iOS SDK before you start setting.

>**Note:** For Vpon SDK and Vpon AdMob Adapter, please [download here][1].

# Set Up Ad Unit
---

## Banner Ad
Please refer to [Google Ad Manager SDK Integration Guide](https://developers.google.com/ad-manager/mobile-ads-sdk/ios/banner#banner_sizes) to determine the size of the ad unit.

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

Please follow the steps below to add Vpon as your Yield Partner first on the **Admin > Companies** page:

1. Choose to create a new company (Ad Network) as your Yield Partner
2. Choose Vpon in the drop list of Ad Network
3. Insert the optional information and save your change


## Set Up Yield Group

Go to **Delivery > Yield groups** and follow the steps below:

1. Create a new Yield Group
2. Determine the ad format and the inventory type for your requirement
3. Determine the ad unit for delivering
4. Finish the optional setting for your requirement
5. Click **Add mediation partner**, and select `Vpon` from the dropdown list
6. Determine the integration type:
* Choose `Mobile SDK` if you are trying to integrate `Banner Ad` or `Interstitial Ad`. Please insert `TW` in the Zone column, and insert your `Vpon License Key` in the Vpon Ad ID column.
* Choose `Custom Event` if you are trying to integrate `Native Ad`. Please insert `GADVpadnNativeAdCustomEvent` in the Class Name column, and insert your `Vpon License Key` in the Parameter column.
7. Save your change



# Tips
---

### Sample Code
Please refer to our [Sample Code] for a complete integration sample.


[Integration Guide]: ../../integration-guide/#initial-sdk
[Sample Code]: {{site.baseurl}}/ios/download/#sample-code-download
[Here]: https://www.google.com/dfp/
[DFP 廣告空間]: {{site.imgurl}}/AppAdManager_03.png
[DFP_Partner_English.png]: {{site.imgurl}}/DFP_Partner_English.png
[新增指定目標]: {{site.imgurl}}/AddTargeting.png
[廣告素材類型]: {{site.imgurl}}/SDKMediation.png
[Warning]: {{site.imgurl}}/DFP_EN2.png
[插頁尺寸]: {{site.imgurl}}/dfp_interstitial.png
[1]: {{site.baseurl}}/ios/download