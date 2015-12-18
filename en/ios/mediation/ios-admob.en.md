---
layout:         "ios"
title:          "iOS - AdMob"
lead:           "iOS mediation"
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       ios/mediation/admob/
lang:           "en"
---
# Google AdMob mediation
--------
Google Admob Mediation document, please refer to [here].

# Google Ad Network Mediation
-----

1. Log in Google AdMob.
 Please log in to your [AdMob account][0]
![1]

2. `Monetise` -> `+ Monetise new app`
![][2]

3. Select an app: <br>
  (1) Put your app name.<br>
  (2) Select `platform`. <br>
  (3) Click `Add app`. <br>
![][3]

4. Select ad format and name ad unit: <br>
(1) Choose "banner" or "interstitial" ad type. <br>
(2) Setting. <br>
(3) Ad unit name (ex. Vpon_Banner).  <br>
(4) Save it. <br>
![][4]

5. Get an Ad unit ID, then click Done.
![][5]

6. Edit mediation
![][6]

7. New ad network
![][7]

8. Set Vpon into mediation list：    <br>
(1) Find the VPON Network tag in Available ad netwroks <br>
(2) Vpon Ad ID: put the Vpon’s Banner ID that you get from vpon’s back office.  <br>
(3) Zone: Choose the region, which you want to request ads from Vpon Platform.  <br>

(If the user of your app is from China, you need to fill with `cn` in this column; otherwise, you need to fill with `tw`.)

![][8]


# Download Sample Code
--------------------
[Download Sample Code]

  [here]: https://developers.google.com/admob/ios/quick-start
  [0]: http://www.google.com/admob/
  [1]:  {{site.imgurl}}/AdMobScreenshotEnglishAndroid1.jpg
  [2]:  {{site.imgurl}}/Admob2_eng.png
  [3]:  {{site.imgurl}}/Admob3_eng.png
  [4]:  {{site.imgurl}}/Admob4-Android_eng.png
  [5]:  {{site.imgurl}}/Admob5-Android_eng.png
  [6]:  {{site.imgurl}}/AdMobScreenshotEnglishAndroid6.jpg
  [7]:  {{site.imgurl}}/Admob7-Android_eng.png
  [8]:  {{site.imgurl}}/AdMobDefaultAdNetWork.jpg
  [Download Sample Code]: {{site.baseurl}}/ios/download/#admob
