---
layout:         "web"
title:          "Web - Adhesion Banner"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /jp/web/adhesion-banner/
lang:           "jp"
---

# Overview
---
Vpon Mobile Web SDK provides a new type of ad : Adhesion Banner, which is positioned to the bottom of the device display, to maximize your monetization.<br>

> **Note**:
>It only supports ads on <strong>`mobile site`</strong>, it would not show any ad if you open your website on personal computer.
<br>

<br>

# Setups
---
Just like the setups in original banner, you should insert the following snippet of code directly after the opening <body> tag on each page you want to load it. <strong>The biggest difference</strong> between the original one & adhesive is that the latter includes a new attribute : <strong>vpon_ad_adhesion</strong>. The banner will be positioned to the top of the device display while this new attribute’s value is <strong>top</strong>, and it will be positioned to the bottom if the attribute's value is <strong>bottom</strong>.



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
            vpon_ad_adhesion="top"
            debug="true"></vpon>
    </div>
    <script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
  </body>
```

> **Note**:

>* Vpon Web SDK supports `HTTP` & `HTTPS`. Please use `//m.vpon.com/sdk/vpadn-sdk.js` as the source while importing SDK. According to the protocol of the page, browsers will import the suitable one.
>
>* You only allow to use 1 adhesion banner on top and 1 adhesion banner on bottom at the same time, and use 3 ads( include Original Banner & Adhesion Banner ) at most in one page. Please use different banner ID for every ad.
>
>* You only need to put <font color="red">just one</font> JavaScript before "</body>" like the sample code above.
>
>* After saving the page, this code will load and initialize the SDK. You can load a test ad in the <vpon> tag. (If you want to see the official ad: vpon_ad_test="0")
>
>* The adhesion feature of Adhesion Banner will be lost while embedding the ad in an iframe.
>
>* Remember to replace the license key with your own one which apply on our website.

<br>

## Advanced Setup


名称                  |        說明                      | 必須       |  インスタンス
:--------------------:|:---------------------------------------:|:-------------:|:------------------------:
vpon\_ad\_licensy\_key| 広告枠 ID                               |  Y         |<font color="red">Vpon License Key（=プロパティID）を入力して</font>
vpon\_ad\_format      | 広告フォーマット：320x50\_mb    |   Y       |     "320x50\_mb"
vpon\_ad\_test        | テスト広告を取得するかどうか              | N       |   1(はい)/0(いいえ)<br>デフォルト: (はい)
vpon\_ad\_adhesion    | Adhesion Ad                        | N          |   top/bottom
debug                 | コンソールにデバッグ情報を表示するかどうか      |  N      |  true/false<br>デフォルト:false
openTab               | 新しいタブで広告コンテンツを表示するには     |N         |  true/falseをtrueにセットしてください

<br>

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
