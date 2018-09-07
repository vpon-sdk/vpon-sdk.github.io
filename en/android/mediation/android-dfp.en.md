---
layout:         "android"
title:          "Android - DFP"
lead:           "android mediation"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/mediation/dfp/
lang:           "en"
---
This document provides instructions for using the Google Mobile Ads SDK to display banner ads. If you're not familiar setting banner and interstitial, review [integration guide] first for SDK and DFP.

If you are using AdMob or DFP, please import 2 JARs into your project. ([download][1])

1. Fundamental SDK
2. Adapter SDK


# Create an Ad Unit
---
Define ad units first in DoubleClick for Publishers and then add them to the ad tags on your mobile app. This is the typical method of creating an ad unit. The formate of ad unit is like: `/networkCode/adUnitName`


## Unit Ads Settings
Go to DFP ([Here])：

1. Inventory
2. Setting New Ad Unit (Give your ad unit a descriptive name so that you can easily determine where that ad unit will be displayed and also include the size of that unit.)
3. Generate tags (Choose mobile applications)

![DFP 廣告空間]

## Setting Order, Line Item and Creative
To run a new ad campaign through DFP Small Business, you'll first need to create a new order. After creating the order, you'll need to create line items, add creatives, and approve the order before it can serve. For reserved line item types (sponsorship and standard), DFP will not reserve inventory until the order is approved.<br><br>


To create an order before running an inventory forecast:

1. In your DFP Small Business account, click the Orders tab.
2. Click New order.
3. Enter your order information in the appropriate fields.
(Order names must be unique within your network.)

4. Enter your line item information.
5. Click Check inventory to ensure the order will have enough available impressions.
![Warning]

6. Click `Save`。
Once you've created an order, you'll need to approve it before the line items are eligible to serve. See Approve an order to learn how.
<br><br>

## Create a Line Item
To create a line item:

1. In your DFP Small Business account, click the Orders tab.
2. Create a new order or click an existing order in the table.
3. Click New line item.
4. Enter a line item name. Line item names must be unique within your network.
5. Enter the inventory sizes of the creatives you plan to upload.
6. (Optional) Enter some comments about the line item that might help with trafficking the line item.
7. Enter the line item type, dates, quantity and cost.
8. Under Adjust delivery, configure your delivery settings (optional). See Optional delivery settings below for more information.
9. Select the inventory you want to target.

You can target ad units, placements, or both. To find inventory to target, you can either browse through your network’s inventory or perform a search.

The ad unit named after your network represents all of the ad units in your network. If you target the line item to this network-level ad unit, the line item will target any ad unit in your network.

Example：<br>
![新增指定目標]

10.Enter additional targeting criteria to target a specific audience (optional). If you don’t target the line item to any ad units or placements, then the line item will be set to serve as run-of-network. This means the line item can serve to any ad unit on your website.

11.Click `Save`.

## Upload a creative

1. Click the line item where you'd like to add the creative. You can also create a new line item if needed.
2. Click Add creatives. All creatives and ad unit dimensions associated with your line item will be listed on the left-hand column. You can upload creatives to any unit size in this list.
3. You can either drag and drop multiple creatives into the line item or just add one at a time.<br><br>

### Add only one Creative
Click New creative and select the creative's dimensions. (Choose `Mobile App` → `SDK Mediation`)

![廣告素材類型]

# Creative Setting
---
Input the following information:

1. Select Network：Vpon
2. Zone：`TW`
3. Vpon Ad ID：the License ID observed obtained from Vpon

![DFP_Partner_English.png]



# Banner/Interstitial Ad delivery
---

## Banner Ad Unit
As the article discussed above, ad size set at 320x50.

## Interstitial Ad Unit
Create an ad unit in DFP to represent the interstitial ad unit. Interstitial ad units can be defined with one of the four common sizes, regardless of the actual screen size of individual devices. The SDK will handle rendering the creative correctly on screens which are of slightly different sizes.

* Cell phone：320x480 (portrait)、480x320 (landscape)
* Tablet：768x1024 (portrait)、1024x768 (landscape)

There is no need to define a separate ad unit for landscape mode. You can simply add the landscape size (e.g. 480x320 for smartphones) to line items targeting the interstitial ad unit and include a creative with the landscape size in addition to the regular portrait size.

Example：

![插頁尺寸]



# Other Reference
---
[DFP Small Business](https://support.google.com/dfp_sb/)<br>
[Google Developers DFP Banner Ads](https://developers.google.com/mobile-ads-sdk/docs/dfp/fundamentals#android)<br>
[Google Developers Interstitial Ads](https://developers.google.com/mobile-ads-sdk/docs/android/doubleclick/#support)

# Download Sample Code
---
 [Android Download][1]


[integration guide]: ../../integration-guide
[1]: {{site.baseurl}}/android/download/#dfp
[Here]: https://www.google.com/dfp/
[DFP 廣告空間]: {{site.imgurl}}/ADUNIT_DFP.png
[DFP_Partner_English.png]: {{site.imgurl}}/DFP_Partner_English.png
[新增指定目標]: {{site.imgurl}}/AddTargeting.png
[廣告素材類型]: {{site.imgurl}}/SDKMediation.png
[Warning]: {{site.imgurl}}/DFP_EN2.png
[插頁尺寸]: {{site.imgurl}}/dfp_interstitial.png
