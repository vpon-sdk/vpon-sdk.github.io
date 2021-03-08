---
layout:         "web"
title:          "Web - Send Custom Content Data To Vpon"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       web/content-data/
lang:           "en"
---

# Overview
---
Vpon Web SDK now provide new interfaces so that you can send some custom content data to Vpon.

This instruction will show you how to send the Key-value info to Vpon via Google Ad Manager Macro.

# Step1. Finish Google Publisher Tag Setting
---
Please add at least one Key-value info to your Ad Unit in your [Google Ad Manager Account], and generate Publisher Tag as below:

```javascript
<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
<script>
      window.googletag = window.googletag || {cmd: []};
      googletag.cmd.push(function() {
        googletag.defineSlot('/Publisher ID/Ad Unit ID', [300, 250], 'div-gpt-ad-1604460699018-0').addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.pubads().setTargeting('g', ['male']);
        googletag.enableServices();
      });
</script>
```

# Step2. Set Up An Order And A Line Item
---
Please add an order and a line item in your [Google Ad Manager Account] base on the campaign duration and targeting setting, and you must add the Ad Unit into this line item.

# Step3. Set Up Ad Creative
---
Take Banner Ad as an example, please refer to the sample code below and create a `Third party` creative.


```html
<vpon vpon_ad_test='0'
      vpon_ad_licensy_key='License Key'
      vpon_ad_format='300x250_mb'
      debug='true'
      vpon_content_data ='%%PATTERN:TARGETINGMAP%%'></vpon>

<script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js"></script>
```

>**Note:**
>* Please replace the Banner ID with your own one
>* Please disable `Serve as SafeFrame` for this creative
>* For Google Ad Manager Macro, please refer to: [Google Ad Manager Macro]


## Related Interface Spec
---

| Name          | Description              | Required    | Note                      |
|:------------:|:----------------:|:-------:|:-------------------------:|
|vpon\_content\_data| Custom content data    | N       | JSON-format string           |


[Google Mobile Ads SDK Integration Guide]: https://developers.google.com/ad-manager/mobile-ads-sdk/ios/quick-start
[Google Ad Manager Account]: https://admanager.google.com
[Ad Manager Ad Unit]: {{site.imgurl}}/AppAdManager_03.png
[Google Ad Manager Macro]: https://support.google.com/admanager/answer/2376981