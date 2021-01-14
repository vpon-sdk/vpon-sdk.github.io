---
layout:         "web"
title:          "Web - Send Advertising ID To Vpon"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       web/deviceid/
lang:           "en"
---

# Overview
---
Vpon Web SDK now provide new interfaces so that you can send the Advertising ID of the device to Vpon.

This instruction will show you how to send the Advertining ID to Vpon via Google Ad Manager Macro.

# Step1. Integrate Mobile Ads SDK
---
You must integrate Google Mobile Ads SDK and load ad through it. Please refer to [Google Mobile Ads SDK Integration Guide] to finish your integration.

# Step2. Set Up GAM Ad Unit
---
Please add a new Ad Unit in your [Google Ad Manager Account] base on the ad size you are trying to display. Then you have to generate the ad tag, please choose `Mobile applications` as the tag type.

![Ad Manager Ad Unit]


# Step3. Set Up An Order And A Line Item
---
Please add an order and a line item in your [Google Ad Manager Account] base on the campaign duration and targeting setting, and you must add the Ad Unit into this line item.

# Step4. Set Up Ad Creative
---
Take Banner Ad as an example, please refer to the sample code below and create a `Third party` creative.


```html
<vpon vpon_ad_test="0"
      vpon_ad_licensy_key="License Key"
      vpon_ad_format="300x250_mb"
      debug="true"
      ad_identifier="%%ADVERTISING_IDENTIFIER_PLAIN%%"
      ad_id_type="%%ADVERTISING_IDENTIFIER_TYPE%%"
      ad_is_lat="%%ADVERTISING_IDENTIFIER_IS_LAT%%"></vpon>

<script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js"></script>
```

>**Note:**
>* Please replace the Banner ID with your own one
>* Please disable `Serve as SafeFrame` for this creative
>* For Google Ad Manager Marco, please refer to: [Google Ad Manager Macro]


## Related Interface Spec
---

| Name          | Description              | Required    | Example                      |
|:------------:|:----------------:|:-------:|:-------------------------:|
|ad\_identifier| Mobile Device Advertining ID    | N       | Mobile Device Advertining ID String           |
|ad\_id_type   | Mobile Device Type       | N       | iOS: idfa <br> Andorid: adid |
|ad\_is_lat    | Limit Ad Tracking Setting    | N       | 0: User has not chosen to limit ad tracking <br> 1: User has chosen to limit ad tracking |


[Google Mobile Ads SDK Integration Guide]: https://developers.google.com/ad-manager/mobile-ads-sdk/ios/quick-start
[Google Ad Manager Account]: https://admanager.google.com
[Ad Manager Ad Unit]: {{site.imgurl}}/AppAdManager_03.png
[Google Ad Manager Macro]: https://support.google.com/admanager/answer/2376981