---
layout:         "default"
title:          "Web - Adhesion Banner"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       web/adhesion-banner/
lang:           "en"
---

# Overview
---
Vpon Mobile Web SDK provides a new type of ad : Adhesion Banner, which is positioned to the bottom of the device display, to maximize your monetization.

<font color="red">**Note**：It only supports ads on mobile site, it would not show any ad if you open your website on personal computer.</font>



# Requirement
---
1. The basic concept of HTML
2. Registering a banner ID for Vpon Mobile Web
3. Having the permission to modify code of mobile website

<br>

# Ad Formats
---
Vpon Mobile Web SDK supports the following `Adhesion Banner ad format`:<br>



| Name              |    Size(WxH)  |
| :---------------- | :------------:|
| Banner            |    320x50     |

<br>

# Setups
---
Just like the setups in original banner, you should insert the following snippet of code directly after the opening <body> tag on each page you want to load it. <strong>The biggest difference</strong> between the original one & adhesive is that the latter includes a new attribute : <strong>vpon_ad_isBottom</strong>. The banner will be  positioned to the bottom of the device display while this new attribute’s value is <strong>true</strong>.



```html
<html>
  <head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  </head>
  <body>
    <h1>The Test Page</h1>

    <div>
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="Your Banner ID"
            vpon_ad_format="320x50_mb"
            debug="true"></vpon>
    </div>
    </br>
    <div>
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="your_first_vpon_banner_id"
            vpon_ad_format="320x50_mb"
            vpon_ad_isBottom="true"
            debug="true"></vpon>
    </div>
    <script type="text/javascript" src="http://m.vpon.com/sdk/vpadn-sdk.js"> </script>
  </body>
```

> **Note**:

>* You only allow to use 1 adhesion banner ad in one page, and use 3 ads( include Original Banner & Adhesion Banner ) at most in one page. Please use different banner ID for every ad.
>
>* You only need to put <font color="red">just one</font> JavaScript before "</body>" like the sample code above.
>
>* After saving the page, this code will load and initialize the SDK. You can load a test ad in the <vpon> tag. (If you want to see the official ad: vpon_ad_test="0")
>
>* The adhesion feature of Adhesion Banner will be lost while embedding the ad in an iframe.
>
>* Remember to replace the license key with your own one which apply on our website.





# Results
---
<img src="{{site.imgurl}}/Adhesion-Banner-1.png" alt="" class="width-300"/>


# FAQ
---

## Still can't see any ad
Please check the following items:

* Please open the page by mobile browser not the personal computer.

* Clean the cache, delete cookie and reload the page.

## Still can't solve it
Open the debug mode and send all of  "Vpadn-" informations to [Vpon FAE]

[Vpon FAE]: mailto:fae@vpon.com
