---
layout:         "android"
title:          "Android - AdMob"
lead:           "android mediation"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       android/mediation/admob/
lang:           "en"
---
# Overview
---
This document provides instructions for using the Google Mobile Ads SDK to display banner ads. If you are using AdMob or Google Ad Manager, please make sure below files are included in your project.

1. Fundamental SDK
2. Adapter SDK

# Ad Unit
---

## Set Up A New App
Log in to your [AdMob][1] first. Set up a new app and get your App ID.
<img src="{{site.imgurl}}/AdMob_023.png" alt="" class=""/>

## Create Ad Unit
Create an ad unit ang get your Ad Unit ID.
<img src="{{site.imgurl}}/AdMob_024.png" alt="" class=""/>

Please add the App ID and Ad Unit ID to your application to display ads.

# Mediation
---

## Mediation Group
Open "Medation" page, click CREATE MEDIATION GROUP to create mediation group.
<img src="{{site.imgurl}}/AdMob_025.png" alt="" class=""/>

Set up meditaion group that based on your requirement.
<img src="{{site.imgurl}}/AdMob_026.png" alt="" class=""/>

Add Ad Units to the mediation group.
<img src="{{site.imgurl}}/AdMob_027.png" alt="" class=""/>
<img src="{{site.imgurl}}/AdMob_028.png" alt="" class=""/>

## Set Up Ad Network
If you want to display Banner Ad or Interstitial Ad in your app, please choose `ADD AD NETWORK`
<img src="{{site.imgurl}}/AdMob_029.png" alt="" class=""/>

Select Vpon.
<img src="{{site.imgurl}}/AdMob_030.png" alt="" class=""/>

Please insert your own Vpon License key in Vpon Ad ID and insert "TW" in Zone.
<img src="{{site.imgurl}}/AdMob_031.png" alt="" class=""/>


## Custom Event
If you want to display Native Ad in your app, please choose `ADD CUSTOM EVENT`
<img src="{{site.imgurl}}/AdMob_032.png" alt="" class=""/>

Please insert the Class Name of CustomEvent as below. For example, if you are integrating with your Android app, please insert `com.vpadn.mediation.VpadnAdapter` and insert your own Vpon License Key in Parameter.
<img src="{{site.imgurl}}/AdMob_033.png" alt="" class=""/>


# Tips
---

### Sample Code
Please refer to our [Sample Code] for a complete integration sample.


[串接說明]:http://wiki.vpon.com/android/integration-guide/
[1]:https://apps.admob.com
[Sample Code]: {{site.baseurl}}/android/download