---
layout:         "web"
title:          "Web - Native Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       web/native/
lang:           "en"
---

# Overview
---
Different from banner and interstitial, Vpon provide three types of layouts that include a group of ad creatives such as titles and images for each. You can embed `CSS` in your HTML to make the native ad layouts more fit to your website.<br>

> **Note**:
>Native ads are only available on <strong>`mobile sites`</strong>, you won't see any ads if you open your website with personal computers.

<br>

# Setups
---

## Basic Setup
You should put following code snippet in the <body> section of the page that you want to show ads.

```html
<body>
...
  <vpon vpon_ad_test="1"
        vpon_ad_licensy_key="License Key"
        vpon_ad_format="na"
        vpon_na_layout="0"
        vpon_na_min="1200x627"
        debug="true"></vpon>
...
  <script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
...
</body>
```

> **Note**:
>
>* Vpon Web SDK supports `HTTP` & `HTTPS`. Please use `//m.vpon.com/sdk/vpadn-sdk.js` as the source and put it before "</body>" while importing SDK. Browsers will import the suitable one base on the protocol of the page. Besides, you only need to import it <font color="red">once</font>.
>
>* Change the parameter of vpon_na_min to specify the size of image or we’ll return a proper one that depends on the screensize of users.
>
>* Once you finish editing your page, save and reload it. You can find a test ad in the <vpon> tag after initializing the SDK.
>
>* Please modify the parameter of vpon_ad_test to `"0"` to get formal ads before you launch your site officially.

<br>

## Native Ad layouts {#layout}
---
Vpon Mobile Web SDK provides three types of layouts for Native Ads. You'll get a group of creatives depends on the parameter of `vpon_na_layout`. Embed `CSS` to your HTML to make these creatives more fit to your website!<br>

Check [Native Ad Spec] for the specification of how to show Native Ad.

![Web_Native_Layout]

<br>

## Callback {#callback}
---
Use our Callback Function rationally when there is no proper ad fill.

```html
<body>
...
  <vpon vpon_ad_test="1"
        vpon_ad_licensy_key="License Key"
        vpon_ad_format="na"
        vpon_na_layout="0"
        vpon_na_min="1200x627"
        debug="true"
        ad_request_callback="vponCallBackMethod"></vpon>
...
  <script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
...
  <script>
        function vponCallBackMethod(adStatus) {
          if (adStatus != 0) {
            // No ads, do something here.
          } else {
            // Ad received.
          }
        }
  </script>
...
</body>
```
<br>

## Advanced Setup {#advanced}
---

Name                  | Description                              | Reuqired  | Example
:--------------------:|:----------------------------------------:|:----------:|:------------------------:
vpon\_ad\_licensy\_key| License Key from Vpon                    | Y         | <font color="red">Fill in with your Vpon License Key</font>
vpon\_ad\_format      | Format:<br>na                             | Y          | "na"
vpon\_ad\_test        | Test Ad                                  | N          | 1(Yes)/0(No)<br>Default = "1"
vpon\_na\_layout      | Native Ad layouts                        | N          | Please refer to [Native Ad layouts]. <br>Default = "0"
vpon\_na\_min         | Size of Main Image<br>(1) 1200x627<br>(2) 627x627 | N          | "1200x627"
debug                 | Debugging information in console         | N          | true/false<br>Default = "false"
openTab               | If open a new tab to show ad's contents  | N          | true/false<br>Default = "true"
ad\_request\_callback | Callback Function for no ad fill         | N          | Please refer to [Callback].

<br>

# Navive Ad Spec {#nativeAdSpec}
--------
We will return the creatives that depends on the parameter of `vpon_na_layout`. The form below shows the creatives you might get. The properties in `red` must show on the ads.

Properties   |Class Name   | Description
:-----------:|:-----------:|:-----------:|
<font color="red">Title</font> | vpon-title | Title of the ads, text should be clear and eazy to read <br> Max length: 30 English character or 15 Chinese words
:-----------:|:-----------:|:-----------:|
<font color="red">Main Image</font> | vpon-cover-image| 1200 x 627px <br> 627 x 627px<br> (enable to scale in proportion or crop into 16:9, 4:3)
:-----------:|:-----------:|:-----------:|
<font color="red">AD Badge</font> | vpon-attribution  | Let user know it is an ad <br>(e.g. Sponsor name, Sponsor, Ad, and so on ) <br> Max length: 15 English character or 8 Chinese words
:-----------:|:-----------:|:-----------:|
Icon  | vpon-icon-image| 128 x 128px<br> (enable scaling in proportion, without distortion and clipping)
:-----------:|:-----------:|:-----------:|
Description  | vpon-body-text| Description of the ads <br> Max length: 100 English character or 50 Chinese words
:-----------:|:-----------:|:-----------:|
CallToAction | vpon-action| Show comletely <br> Max length: 20 English character or 10 Chinese words
:-----------:|:-----------:|:-----------:|

# Result
---
<img src="{{site.imgurl}}/Web_Native_Sample.png" alt="" class="width-300"/>


# Sample Code
---

```html
<html>
  <head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <title>Vpon Native Ad</title>
  <!-- Native Ad Style -->
  <style>
      .vpon-native-ad{
        border: 1px solid #dcdcdc;
        position: relative;
      }

      .vpon-native-ad .vpon-title{
        display: block;
        padding: 5px;
        font-size: 20px;

      }

      .vpon-native-ad .vpon-cover-image{
        float: left;
        width: 33%;
        margin: 10px;
      }
      .vpon-native-ad .vpon-cover-image img{
        width: 100%;
      }

      .vpon-native-ad .vpon-icon-image{
      }

      .vpon-native-ad .vpon-body-text{
        font-size: 14px;
      }

      .vpon-native-ad .vpon-action{
        display: none;   
      }

      .vpon-native-ad .vpon-attribution{
        position: absolute;
        color: #9a9a9a;
        right: 5px;
        bottom: 5px;
        font-size: 13px;
      }
    </style>
  </head>
  <body>
    <h1>The Test Page</h1>

    <div>
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="License Key"
            vpon_ad_format="na"
            vpon_na_layout="0"
            vpon_na_min="1200x627"
            debug="true"></vpon>
    </div>

    <script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
  </body>
</html>
```

> **Note:**
>If you use iframe to embed vpon's ad, please remember to set the size of iframe properly to fit the ads.

<br>

# FAQ
---

## Still can't see any ad
Please check the following items:

* Please open the page with a mobile browser instead of a personal computer.
* Clean the cache, delete cookies and reload the page.

## Still can't solve it
Turn on the debug mode and send all of  "Vpadn-" messages to [Vpon FAE]

[Native Ad layouts]: {{site.baseurl}}/web/native/#layout
[Advanced Setup]: {{site.baseurl}}/web/native/#advanced
[Callback]: {{site.baseurl}}/web/native/#callback
[Web_Native_Layout]: {{site.imgurl}}/Web_Native_Layout.png
[Native Ad Spec]: {{site.baseurl}}/web/native/#nativeAdSpec
[Vpon FAE]: mailto:fae@vpon.com
