---
layout:         "web"
title:          "Web - Adhesion Banner"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       web/adhesion-banner/
lang:           "en"
---

# Overview
---
Vpon Mobile Web SDK provides Adhesion Banner, which can be placed on the top or bottom of your mobile website to maximize your monetization.<br>

> **Note**:
>Ashesion Banners are only available on <strong>`mobile sites`</strong>, you won't see any ads if you open your website with  personal computers.
<br>

<br>

# Setups
---
Just like the setups in original banner, you should put following code snippet in the <body> section of the page that you want to show ads. The <strong>biggest</strong> difference between the original one and adhesive is that the latter includes a new attribute : <strong>vpon_ad_adhesion</strong>. The banner will be positioned to the top of the device display while this new attribute’s value is <strong>top</strong>, and it will be positioned to the bottom if the attribute's value is <strong>bottom</strong>.



```html
  <body>
...
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="License Key"
            vpon_ad_format="320x50_mb"
            debug="true"></vpon>
...
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="License Key"
            vpon_ad_format="320x50_mb"
            vpon_ad_adhesion="bottom"
            debug="true"></vpon>
...
    <script type="text/javascript" src="https://m.vpon.com/sdk/vpadn-sdk.js"> </script>
...
  </body>
```

> **Note**:
>
>* Vpon Web SDK supports `HTTPS`. Please use `https://m.vpon.com/sdk/vpadn-sdk.js` as the source and put it before "</body>" while importing SDK. Browsers will import the suitable one base on the protocol of the page. Besides, you only need to import it <font color="red">once</font>.
>
>* You only allow to use 3 ads at most in each page and please use different License Key for every ad.
>
>* The adhesion feature of Adhesion Banner will be lost while embedding the ad in an iframe.
>
>* Once you finish editing your page, save and reload it. You can find a test ad in the <vpon> tag after initializing the SDK.
>
>* Please modify the parameter of vpon_ad_test to `"0"` to get formal ads before you launch your site officially.

<br>

## Advanced Setup
---

Name                  | Description                              | Reuqired  | Example
:--------------------:|:----------------------------------------:|:----------:|:------------------------:
vpon\_ad\_licensy\_key| License Key from Vpon                    | Y          | <font color="red">Put your Vpon License Key</font>
vpon\_ad\_format      | Format <br>(1)320x50                     | Y          | "320x50\_mb"
vpon\_ad\_test        | Test Ad                                  | N          | 1(Yes)/0(No)<br>Default = "1"
vpon\_ad\_adhesion    | Adhesion Ad                              | N          | top/bottom<br>
debug                 | Debugging information in console         | N          | true/false<br>Default = "false"
openTab               | If open a new tab to show ad's contents  | N          | true/false<br>Default = "true"
ad\_request\_callback | Callback Function for no ad fill         | N          | Please refer to [Callback]

<br>


# Results
---
<img src="{{site.imgurl}}/Adhesion-Banner-1.png" alt="" class="width-300"/>


# FAQ
---

## Still can't see any ads
Please check the following items:

* Please open the page with a mobile browser instead of a personal computer.
* Clean the cache, delete cookies and reload the page.

## Still can't solve it
Turn on the debug mode and send all of  "Vpadn-" messages to [Vpon FAE]

[Callback]: {{site.baseurl}}/web/original-banner/#callback
[Vpon FAE]: mailto:fae@vpon.com
