---
layout:         "web"
title:          "Web - Original Banner"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /jp/web/original-banner/
lang:           "jp"
---

# Overview
---
Vpon Mobile Web SDK provides Original Banner which can be placed your mobile website to maximize your monetization.

> **Note**:
>Original Banners are only available on <strong>`mobile sites`</strong>, you won't see any ads if you open your website with  personal computers.

# Ad Formats
---
Vpon Mobile Web SDK supports the following `original banner ad formats`:

| Name              |    Size(WxH)  |
| :---------------: | :------------:|
| Banner            |    320x50     |
| Medium Rectangle  |    300x250    |

# Setups
---

## Basic Setup
You should put following code snippet in the <body> section of the page that you want to show ads.

```html
<body>
...
  <vpon vpon_ad_test="1"
        vpon_ad_licensy_key="Your First License Key for Banner"
        vpon_ad_format="320x50_mb"
        debug="true"></vpon>
...
  <vpon vpon_ad_test="1"
        vpon_ad_licensy_key="Your Seconde License Key for Banner"
        vpon_ad_format="300x250_mb"
        debug="true"></vpon>
...
  <vpon vpon_ad_test="1"
        vpon_ad_licensy_key="Your Third License Key for Banner"
        vpon_ad_format="320x480_mb"
        debug="true"></vpon>
...
  <script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
</body>
```

> **Note**:
>
>* Vpon Web SDK supports `HTTP` & `HTTPS`. Please use `//m.vpon.com/sdk/vpadn-sdk.js` as the source and put it before "</body>" while importing SDK. Browsers will import the suitable one base on the protocol of the page. Besides, you only need to import it <font color="red">once</font>.
>
>* You only allow to use 3 ads at most in each page and please use different License Key for every ad.
>
>* Once you finish editing your page, save and reload it. You can find a test ad in the <vpon> tag after initializing the SDK.
>
>* Please modify the parameter of vpon_ad_test to `"0"` to get formal ads before you launch your site officially.

## Callback {#callback}
---
Use our Callback Function rationally when there is no proper ad fill.

```html
<body>
...
  <vpon vpon_ad_test="1"
        vpon_ad_licensy_key="License Key"
        vpon_ad_format="320x50_mb"
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

## Advanced Setup
---

Name                  | Description                              | Reuqired  | Example
:--------------------:|:----------------------------------------:|:----------:|:------------------------:
vpon\_ad\_licensy\_key| License Key from Vpon                    | Y         | <font color="red">Fill in with your Vpon License Key</font>
vpon\_ad\_format      | Format：<br>(1)320x50\_mb <br>(2)300x250\_mb| Y       | "320x50\_mb"
vpon\_ad\_test        | Test Ad                                  | N          | 1(Yes)/0(No)<br>Default = "1"
vpon\_ad\_adhesion    | Adhesion Ad                              | N          | top/bottom<br>
debug                 | Debugging information in console         | N          | true/false<br>Default = "false"
openTab               | If open a new tab to show ad's contents  | N          | true/false<br>Default = "true"
ad\_request\_callback | Callback Function for no ad fill         | N          | Please refer to [Callback]

# Sample Code
---

```html
<html>
  <head><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  </head>
  <body>
    <h1>The Test Page</h1>

    <div>
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="License Key"
            vpon_ad_format="320x50_mb"
            debug="true"></vpon>
    </div>
    </br>
    <div>
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="License Key"
            vpon_ad_format="300x250_mb"
            debug="true"></vpon>
    </div>
    <script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
  </body>
```

> **Note:**
>If you use iframe to embed vpon's ad, please remember to set the size of iframe properly to fit the ads.

# Google Ad Manager Mediation
---
This document provides an instruction of using Google Ad Manager to display Vpon ads.

## Create Ad Unit and Generate Publisher Tag
---
Please finish below setting in [Google Ad Manager]:

1. Create an ad unit.
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

Input the snippet of code:

```html
<vpon vpon_ad_test="0"
       vpon_ad_licensy_key="License Key"
       vpon_ad_format="320x50_mb"
       debug="true"></vpon>
      <script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
```
> **Note**: vpon_ad_test="1" for test ads，vpon_ad_test="0" for normal ads.

Please refer to the screenshot below to finish your setting. Note that "Serve into a SafeFrame" is not support.
<img src="{{site.imgurl}}/WebAdManager_24.png" alt="" class="width-600" />


<!-- ### Callback for traffic remnant ads
snippet of code is provided below:

```html
<div id="Vpadn_tag"></div>
<script src="https://www.googletagservices.com/tag/js/gpt.js"></script>
<script type='text/javascript'>
  googletag.cmd.push(function() {
    googletag.defineSlot('your_ad_unit', [320, 50], 'Vpadn_tag').addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
  });
</script>
<script>
  function vponCallBackMethod(adStatus) {
    if (adStatus != 0) {
      googletag.cmd.push(function() {
        googletag.display('Vpadn_tag');
      });
    }
  }
</script>

<vpon vpon_ad_test="1" vpon_ad_licensy_key="License Key" vpon_ad_format="320x50_mb" debug="true" ad_request_callback="vponCallBackMethod" is_rotate="false"></vpon>

<script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js">
</script>
```
> **Note**：

> 1. your_ad_unit: put the other ad unit received from inventory, e.g. `/network_ID/ad_unit`. This ad unit is targeted by the line item, which is the next ads you want to show when lack of Vpon ads. In the example above, it includes an AdSense script, and make sure that the subsequent ad requests passed-back from the third-party ad server to DFP are unique; therefore, do not call the same third party for ads.
> 2. [320, 50]： you can change the ad size
> 3. your_license_key：please put the vpon's Banner ID here

Example：
![DFP_WEB_CALLBACK]

Need more details to understand how its working, please take a look at this page:[GAM tags](https://support.google.com/dfp_sb/answer/1693146?hl=en) -->

# FAQ
---

### Still can't see any ads
Please check the following items:

* Please open the page with a mobile browser instead of a personal computer.
* Clean the cache, delete cookies and reload the page.

### Still can't solve it
Turn on the debug mode and send all of  "Vpadn-" messages to [Vpon FAE]


[Callback]: {{site.baseurl}}/web/original-banner/#callback
[Vpon FAE]: mailto:fae@vpon.com
[Google Ad Manager]: https://admanager.google.com/

[DFP_WEB_CALLBACK]: {{site.imgurl}}/DFP_WEB_CALLBACK.png