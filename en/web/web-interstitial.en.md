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
Vpon Mobile Web SDK provides a new type of ad : Interstitial Ad, which immediately present rich HTML5 experiences or "web apps" at transition points such as launch, video pre-roll or game level load. Web apps are in-app browsing experiences with a simple close button rather than any navigation bar—the content provides its own internal navigation scheme.

> **Note**:
>It only supports ads on <strong>`mobile site`</strong>, it would not show any ad if you open your website on personal computer.

# Setups
---
You should put following code snippet in the <body> section of the page that you want to show ads. The<strong> biggest  </strong>difference from banner ad is that the attribute <strong>vpon_ad_format</strong> should be <strong>`mi`</strong> of interstitial one.

```html
  <body>
...
      <vpon vpon_ad_test="1"
            vpon_ad_licensy_key="License Key"
            vpon_ad_format="mi"
            debug="true"></vpon>
...
    <script type="text/javascript" src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
...
  </body>
```

> **Note**:
>
>* Vpon Web SDK supports `HTTPS`. Please use `//m.vpon.com/sdk/vpadn-sdk.js` as the source and put it before "</body>" while importing SDK. Browsers will import the suitable one base on the protocol of the page. Besides, you only need to import it <font color="red">once</font>.
>
>* You only allow to use 1 ads at most in each page and please use different License Key for every ad.
>
>* If you use iframe for embedding vpon's ad, please get better control on it, just like the width & height should be 100 %, collapse the iframe after users clikc the close button, and so on.
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
        vpon_ad_format="mi"
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
vpon\_ad\_format      | Format<br>mi | Y       | "320x50\_mb"
vpon\_ad\_test        | Test Ad                                  | N          | 1(Yes)/0(No)<br>Default = "1"
debug                 | Debugging information in console         | N          | true/false<br>Default = "false"
openTab               | If open a new tab to show ad's contents  | N          | true/false<br>Default = "true"
ad\_request\_callback | Callback Function for no ad fill         | N          | Please refer to [Callback]

# Results
---
<img src="{{site.imgurl}}/Web-Interstitial-1.png" alt="" class="width-300"/>


# Google Ad Manager Mediation
---
This document provides an instruction of using Google Ad Manager to display Vpon ads.

## Create Ad Unit and Generate Publisher Tag
---
Please finish below setting in [Google Ad Manager]:

1. Create ad unit.
2. Set up Name, Size, and other items for the ad unit. Please choose `1x1` in size option for interstitial ad.
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
5. Choose inventory sizes: `1x1`
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
Choose `Custom` in All tab:
<img src="{{site.imgurl}}/WebAdManager_35.png" alt="" class="width-600" />

Input the snippet of code:

```html
<script>
  var vponTag = document.createElement('vpon')
  vponTag.setAttribute('vpon_ad_test', '0')
  vponTag.setAttribute('vpon_ad_licensy_key', 'License Key')
  vponTag.setAttribute('vpon_ad_format', 'mi')
  vponTag.setAttribute('debug', 'true')
  vponTag.setAttribute('ad_request_callback', 'vponCallBackMethod')
  window.top.document.body.appendChild(vponTag)
  var vponWebSDK = document.createElement('script')
  vponWebSDK.type = 'text/javascript'
  vponWebSDK.src = '//m.vpon.com/sdk/vpadn-sdk.js'
  window.top.document.body.appendChild(vponWebSDK)
  var up = window.parent;
  var s = up.document.createElement('script');
  s.type = 'text/javascript'
  up.vponCallBackMethod = function (adStatus){
  console.log('adStatus:'+adStatus);
  if(adStatus!= 0) {
    // No ads, do something here.
    console.log('no vpon ad');
    }
  }
  up.document.head.appendChild(s)
</script>
<script>
//%%CLICK_URL_UNESC%%
//%%VIEW_URL_UNESC%%
</script>
```

> **Note**:
>
>* vpon_ad_test="1" for test ads，vpon_ad_test="0" for normal ads.
>
>* Remember to add `//%%CLICK_URL_UNESC%%` & `//%%VIEW_URL_UNESC%%`
>
>* "Serve into a SafeFrame" is not support.


Please refer to the screenshot below to finish your setting. Note that "Serve into a SafeFrame" is not support.
<img src="{{site.imgurl}}/WebAdManager_27.png" alt="" class="width-600" />


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