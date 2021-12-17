---
layout:         "web"
title:          "Web - Native Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /jp/web/native/
lang:           "jp"
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
  <script type="text/javascript"  src="https://m.vpon.com/sdk/vpadn-sdk.js"> </script>
...
</body>
```

> **Note**:
>
>* Vpon Web SDK supports `HTTP` & `HTTPS`. Please use `https://m.vpon.com/sdk/vpadn-sdk.js` as the source and put it before "</body>" while importing SDK. Browsers will import the suitable one base on the protocol of the page. Besides, you only need to import it <font color="red">once</font>.
>
>* Change the parameter of vpon_na_min to specify the size of image or we’ll return a proper one that depends on the screensize of users.
>
>* Once you finish editing your page, save and reload it. You can find a test ad in the <vpon> tag after initializing the SDK.
>
>* Please modify the parameter of vpon_ad_test to `"0"` to get formal ads before you launch your site officially.




## Native Ad Layouts {#layout}
---
Vpon Mobile Web SDK provides three types of layouts with different components for Native Ads. You'll get a group of creatives depends on the parameter of `vpon_na_layout`. Embed `CSS` to your HTML to make these creatives more fit to your website!<br>

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
  <script type="text/javascript"  src="https://m.vpon.com/sdk/vpadn-sdk.js"> </script>
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

# Native Ad Spec {#nativeAdSpec}
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

    <script type="text/javascript" src="https://m.vpon.com/sdk/vpadn-sdk.js"> </script>
  </body>
</html>
```

> **Note:**
>If you use iframe to embed vpon's ad, please remember to set the size of iframe properly to fit the ads.

<br>

# Google Ad Manager Mediation
---
This document provides an instruction of using Google Ad Manager to display Vpon ads.

## Create Ad Unit and Generate Publisher Tag
---
Please finish below setting in [Google Ad Manager]:

1. Create an ad unit that match size of the Native Ad you'll put on the site.
2. Set up Name, Size, and other items for the ad unit.
3. Generate publisher tag

Select an ad unit, click "GENERATE TAGS" to generate publisher tag.
<img src="{{site.imgurl}}/WebAdManager_19.png" alt="" class="width-600" />
Choose "Google Publisher Tag" as tag type.
<img src="{{site.imgurl}}/WebAdManager_20.png" alt="" class="width-600" />
Click "Enable single request".
<img src="{{site.imgurl}}/WebAdManager_21.png" alt="" class="width-600" />
Please paste the code snippet in Document header to <head> and paste the one in Document body to <body> of your website.
<img src="{{site.imgurl}}/WebAdManager_22.png" alt="" class="width-600" />

## Set Up Orders, Line Items and Creatives
---
To run a new ad campaign through Google Ad Manager, you have to create a new order first. Then you must create line items, add creatives, and approve the order to serve the ads. For reserved line item types (sponsorship and standard), Google Ad Manager will not reserve inventory until the order is approved.

### Create Orders
To create an order before running an inventory forecast:

1. Click `Orders` tab in Google Ad Manager.
2. Click `New order` to create a new order.
3. Fill in order information in appropriate fields.
4. Fill in your line item information.
5. Click "Check inventory" to ensure the order will have enough available impressions.
6. Click `Save` to save your setting. Once you've created an order, you must approve it before the line items are eligible to serve.

> **Note:** Order names must be unique within your network.

### Create Line Items

1. Click "Orders" tab in Google Ad Manager
2. Create a new order or choose an existing one in the table.
3. Click "New line item" to create a new line item.
4. Fill in line item name. Line item name must be unique within your network.
5. Choose inventory sizes of the creatives you plan to deliever.
6. (Optional) Enter some comments about the line item that might help with targetting the line item.
7. Enter the line item type, dates, quantity and cost.
8. Under Adjust delivery, configure your delivery settings (optional). See Optional delivery settings below for more information.
9. Select the inventory you want to target. You can target at ad units, placements, or both of them.

![]({{ site.imgurl }}/AddTargeting.png)

You can add additional targeting criteria to target a specific audience (optional). If you don’t target the line item to any ad units or placements, then the line item will be set to serve as run-of-network. This means the line item can serve to any ad unit on your website.

After you finish your line item setting, click `Save` to save it.

### Add Creatives

1. Choose the line item which you'd like to add creatives. You can also create a new one if needed.
2. Click "ADD CREATIVES" to add new creative. All creatives and ad unit dimensions associated with your line item will be listed on the left-hand column. You can upload creatives to any unit size in this list.
3. You can either drag and drop several creatives into the line item or just add one at a time.

### Creative Setting
Choose `Third party` in All tab:
<img src="{{site.imgurl}}/WebAdManager_23.png" alt="" class="width-600" />

Input the Vpon ad tag and the CSS style for Native Ad Layout:

```html
<vpon vpon_ad_test="0"
       vpon_ad_licensy_key="Your License Key for Banner"
       vpon_ad_format="320x50_mb"
       debug="true"></vpon>
      <script type="text/javascript"  src="https://m.vpon.com/sdk/vpadn-sdk.js"> </script>
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

      ...
</style>
```
> **Note**: vpon_ad_test="1" for test ads，vpon_ad_test="0" for normal ads.

Please refer to the screenshot below to finish your setting. Note that "Serve into a SafeFrame" is not support.
<img src="{{site.imgurl}}/WebAdManager_39.png" alt="" class="width-600" />

# FAQ
---

## Still can't see any ad
Please check the following items:

* Please open the page with a mobile browser instead of a personal computer.
* Clean the cache, delete cookies and reload the page.

## Still can't solve it
Turn on the debug mode and send all of  "Vpadn-" messages to [Vpon FAE]

[Native Ad layouts]: {{site.baseurl}}/jp/web/native/#layout
[Advanced Setup]: {{site.baseurl}}/jp/web/native/#advanced
[Callback]: {{site.baseurl}}/jp/web/native/#callback
[Web_Native_Layout]: {{site.imgurl}}/Web_Native_Layout.png
[Native Ad Spec]: {{site.baseurl}}/jp/web/native/#nativeAdSpec
[Vpon FAE]: mailto:fae@vpon.com
[Google Ad Manager]: https://admanager.google.com/
[DFP_WEB_CALLBACK]: {{site.imgurl}}/DFP_WEB_CALLBACK.png