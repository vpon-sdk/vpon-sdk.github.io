---
layout:         "web"
title:          "Web - Interstitial Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       web/interstitial/
lang:           "en"
---

# Overview
---
Vpon Mobile Web SDK provides a new type of ad : Interstitial Ad, which immediately present rich HTML5 experiences or "web apps" at transition points such as launch, video pre-roll or game level load. Web apps are in-app browsing experiences with a simple close button rather than any navigation bar—the content provides its own internal navigation scheme.<br>

> **Note**:
>It only supports ads on <strong>` mobile site `</strong>, it would not show any ad if you open your website on personal computer.
<br>


# Setups
---
You should insert the following snippet of code directly after the opening <body> tag on each page you want to load it. <strong>The biggest difference</strong> from banner ad is that the attribute <strong>vpon_ad_format</strong> should be <strong>`mi`</strong> of interstitial one.


```html
<html>
  <head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  </head>
  <body>
    <h1>The Test Page</h1>

    <div>
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="Your Interstitial ID"
            vpon_ad_format="mi"
            debug="true"></vpon>
    </div>
    <script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
  </body>
```
> **Note**:

>* Vpon Web SDK supports `HTTP` & `HTTPS`. Please use `//m.vpon.com/sdk/vpadn-sdk.js` as the source while importing SDK. According to the protocol of the page, browsers will import the suitable one.
>
>* You only allow to use 1 adhesion banner ad in one page, and use 3 ads( include Original Banner & Adhesion Banner ) at most in one page. Please use different banner ID for every ad.
>
>* You only need to put <font color="red">just one</font> JavaScript before "</body>" like the sample code above.
>
>* After saving the page, this code will load and initialize the SDK. You can load a test ad in the <vpon> tag. (If you want to see the official ad: vpon_ad_test="0")
>
>* Remember to replace the license key with your own one which apply on our website.
>
>* If you use iframe for embedding vpon's ad, please get better control on it, just like the width & height should be 100 %, collapse the iframe after users clikc the close button, and so on.

<br>

## Advanced Setup
---

Name                  |        Description                      | Necessary  |  Example
:--------------------:|:---------------------------------------:|:----------:|:------------------------:
vpon\_ad\_licensy\_key| Banner ID                               |  Y         |<font color="red">Put your Vpon License Key</font>
vpon\_ad\_format      | Size：320x50\_mb, 300x250\_mb            |   Y       |     "320x50\_mb"
vpon\_ad\_test        |   Test Ad                               | N          |   1(Yes)/0(No)，Default(Yes)
vpon\_ad\_isBottom    |   Adhesion Ad                        | N          |   true/false，Default:false
debug                 | Debugging information in console        |  N         |   true/false，Default:false
openTab               |If open a new tab to show ad's contents  |N           |  true/false，Default:true

<br>

# Results
---
<img src="{{site.imgurl}}/Web-Interstitial-1.png" alt="" class="width-300"/>


# FAQ
---

## Still can't see any ad
Please check the following items:

* Please open the page by mobile browser not the personal computer.

* Clean the cache, delete cookie and reload the page.

## Still can't solve it
Open the debug mode and send all of  "Vpadn-" informations to [Vpon FAE]

[Vpon FAE]: mailto:fae@vpon.com
