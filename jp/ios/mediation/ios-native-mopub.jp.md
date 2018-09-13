---
layout:         "ios"
title:          "iOS (Native Ad) Mediation - MoPub"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /jp/ios/native/mediation/mopub/
lang:           "jp"
---
# Download
---
Here is the [sample code] about the mediation between Vpon and MoPub.

# MoPub Settings
---
To setup MoPub for the mediation of Native ad, you need to complete the following steps:

## Step1: Add your app
Click "Inventory" tab and click "Add a New App". Register your app here.
![][6]

## Step2: Add an Ad unit
In the inventory that you just created, click "Add an Ad Unit" to create a native ad.
![][10]

## Step3: Add Vpon Ad Netword
Click "Networks" tab and click "add a Network".
![][1]

## Step4: Custom Native Network
![][2]

## Step5: Add title to manage your Ad network

![][3]

## Step6: Fill in CUSTOMEVENT
Fill in your package name + class name, you can see the sample at the reference page.

## Step7: License Key / adUnitID
Fill in License Key which you apply from our Vpon website, and the key is `strBannerId`
![][11]

## Step8: Enable Vpon Ad Network
After filling in the data above, click "Segments" tab and choose "Global Segment", you will see your inventory, ads, and Vpon ad network. Please turn Vpon Network "Enabled" on, and check the the stauts of the network is "Running".

![][12]


  [1]: {{site.imgurl}}/Mopub_001.png
  [2]: {{site.imgurl}}/Mopub_002.png
  [3]: {{site.imgurl}}/Mopub_003.png
  [4]: {{site.imgurl}}/Mopub_004-a.png
  [5]: {{site.imgurl}}/Mopub_005.png
  [6]: {{site.imgurl}}/Mopub_006.png
  [10]: {{site.imgurl}}/Mopub_010.png
  [11]: {{site.imgurl}}/Mopub_011.png
  [12]: {{site.imgurl}}/Mopub_012.png
  [sample code]: {{site.dnldurl}}/sample-code/iOSMoPubNativeMediationSample.zip
