---
layout:         "web"
title:          "Web - Interstitial Ad"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /jp/web/interstitial/
lang:           "jp"
---

# Overview
---
Vpon Mobile Web SDK provides a new type of ad : Interstitial Ad, which immediately present rich HTML5 experiences or "web apps" at transition points such as launch, video pre-roll or game level load. Web apps are in-app browsing experiences with a simple close button rather than any navigation bar—the content provides its own internal navigation scheme.<br>

> **Note**:
>It only supports ads on <strong>`mobile site`</strong>, it would not show any ad if you open your website on personal computer.
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


名称                  |        說明                      | 必須       |  インスタンス
:--------------------:|:---------------------------------------:|:-------------:|:------------------------:
vpon\_ad\_licensy\_key| 広告枠 ID                               |  Y         |<font color="red">Vpon License Key（=プロパティID）を入力して</font>
vpon\_ad\_format      | 広告フォーマット：320x50\_mb, 300x250\_mb   |   Y       |     "mi"
vpon\_ad\_test        |   テスト広告を取得するかどうか              | N       |   1(はい)/0(いいえ)、デフォルト: (はい)
vpon\_ad\_isBottom    |   Adhesion Ad                        | N          |   true/false、デフォルト:false
debug                 | コンソールにデバッグ情報を表示するかどうか      |  N      |  true/false、デフォルト:false
openTab               |新しいタブで広告コンテンツを表示するには     |N         |  true/falseをtrueにセットしてください

<br>

# Results
---
<img src="{{site.imgurl}}/Web-Interstitial-1.png" alt="" class="width-300"/>

<br>

# Mobile Site DFP
---
This document provides instructions for using the mobile site DFP to display banner ads. If you're not familiar setting mobile web api, review the documents first: "Vpon Mobile Web SDK" to become familiar with this document. Then come back this page and follow the DFP setting steps.

## Generate tags
---
1. Click "Inventory"
2. Click "New ad unit"
3. Choose "Out-of-page" as the size of ad
4. Click "Generate Tags"
5. Choose "Google Publisher Tag"
6. Click "Enable single request", "Enable synchornous requests" and "Out-of-page"
7. Place Header code into the HEAD element of the web page and Document body code into the page body where you want to show ad.

<img src="{{site.imgurl}}/DFP_IS_en_01.png" alt="" class="width-600" />
<img src="{{site.imgurl}}/DFP_IS_en_02.png" alt="" class="width-600" />
<img src="{{site.imgurl}}/DFP_IS_en_03.png" alt="" class="width-600" />
<img src="{{site.imgurl}}/DFP_IS_en_04.png" alt="" class="width-600" />


## Setting Orders, Items and Creatives
---
To run a new ad campaign through DFP Small Business, you'll first need to create a new order. After creating the order, you'll need to create line items, add creatives, and approve the order before it can serve. For reserved line item types (sponsorship and standard), DFP will not reserve inventory until the order is approved.

### Creat Orders Manually
To create an order before running an inventory forecast:

1. In your DFP Small Business account, click the `Orders` tab.
2. Click `New order`.
3. Enter your order information in the appropriate fields.
4. Enter your line item information.
5. Click Check inventory to ensure the order will have enough available impressions.
6. Click `Save`。Once you've created an order, you'll need to approve it before the line items are eligible to serve. See Approve an order to learn how.

> Order names must be unique within your network.


### Create a Line Item

To create a line item:

1. In your DFP Small Business account, click the Orders tab.
2. Create a new order or click an existing order in the table.
3. Click New line item.
4. Enter a line item name. Line item names must be unique within your network.
5. Enter the inventory sizes of the creatives you plan to upload.
6. (Optional) Enter some comments about the line item that might help with trafficking the line item.
7. Enter the line item type, dates, quantity and cost.
8. Under Adjust delivery, configure your delivery settings (optional). See Optional delivery settings below for more information.
9. Select the inventory you want to target. You can target at ad units, placements, or both. To find inventory to target at, you can either browse through your network’s inventory or perform a search. The ad unit named after your network represents all of the ad units in your network. If you target the line item to this network-level ad unit, the line item will target any ad unit in your network.
10. Enter additional targeting criteria to target a specific audience (optional). If you don’t target the line item to any ad units or placements, then the line item will be set to serve as run-of-network. This means the line item can serve to any ad unit on your website.
11. Click `Save`.

### Upload a Creative

1. Click the line item where you'd like to add the creative. You can also create a new line item if needed.
2. Click Add creatives. All creatives and ad unit dimensions associated with your line item will be listed on the left-hand column. You can upload creatives to any unit size in this list.
3. You can either drag and drop multiple creatives into the line item or just add one at a time.

### Add only one creative
Click New creative and select the creative's dimensions. (Choose All → Custom)
<img src="{{site.imgurl}}/DFP_IS_en_05.png" alt="" class="width-600" />

### Creative settings
Input the snippet of code:

```html
<vpon vpon_ad_test="1"
       vpon_ad_licensy_key="Your license Key"
       vpon_ad_format="mi"
       debug="true"></vpon>
<script type="text/javascript"  src="//m.vpon.com/sdk/vpadn-sdk.js"> </script>
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
>* Please do not choose "Serve into a SafeFrame".


Example：
<img src="{{site.imgurl}}/DFP_IS_en_06.png" alt="" class="width-600" />


# FAQ
---

## Still can't see any ad
---
Please check the following items:

* Please open the page by mobile browser not the personal computer.

* Clean the cache, delete cookie and reload the page.

## Still can't solve it
---
Open the debug mode and send all of  "Vpadn-" informations to [Vpon FAE]

[Vpon FAE]: mailto:fae@vpon.com
