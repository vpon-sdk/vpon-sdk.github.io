# Vpon Android SDK Change Log

## 5.1.8
* Release Date: 27 Nov. 2020
* Build Number: 72110202
* Bypass ad request from Android 5.0 (Lollipop) device to prevent potential crash while using WebView
* Enhance ad viewable detection mechanism

## 5.1.7
* Release Date: 11 Nov. 2020
* Build Number: 01110202
* Add addFriendlyObstruction interface base on OM Framework for Publisher to declare those overlay views which won't block the ad visibility as friendly obstruction
* Support HTML type creatives in Native Ad MediaView
* Support to resize the Banner Adview responsively to fit the ad container
* Add log to describe the overlay views info when the ad viewable detection failed
* Bug fix

## 5.1.6
* Release Date: 15 Sept. 2020
* Build Number: 51900202
* Add permission check to avoid potential crash in application target sdk-30
* Enhance the stability of ad request
* Bug fix


## 5.1.5 (Deprecated)
* Release Date: 11 Sept. 2020
* Build Number: 11900202
* Add permission check to avoid potential crash in application target sdk-30
* Enhance the stability of ad request
* Bug fix


## 5.1.4 (Deprecated)
* Release Date: 31 Aug. 2020
* Build Number: 82800202
* Add permission check to avoid potential crash in application target sdk-30
* Enhance the stability of ad request
* Bug fix


## 5.1.3
* Release Date: 12 Aug. 2020
* Build Number: 21800202
* Add a new Banner Ad size 320x480 (Not available for mediation case)
* Support video content in 320x480 and 300x250 Banner Ad
* Fix the creative of Banner Ad might be displayed unsuccessfully after auto refresh


## 5.1.1
* Release Date: 14 Jul. 2020
* Build Number: 41700202
* Upgrade OM SDK from v1.2.8 to v1.3.4
* Adjust the behavior of adListener to align with AdMob
* Added contentUrl and contentData for data transmission (compatible with AdMob / MoPub)
* Fix OM session send unsuccessfully when webview was destoryed too early
* Fix OM impression send unsuccessfully when onImpression was triggered before onPageFinish
* Fix impression of Native Ad might be sent unsuccessfully if setAdView was called after onReceived
* Add a method of [SDK initialization] to enhace the performance
* Bug fixed



## 5.0.4
* Release Date: 6 May. 2020
* Build Number: 60500202
* Support multiple verifications within OM framework
* Adjust the behavior of adListener to align with AdMob
* Added contentUrl and contentData for data transmission (Compatible with AdMob / MoPub)



## 5.0.3
* Release Date: 9 Apr. 2020
* Build Number: 80400202
* Add more null examination to prevent NPE
* Add consumer-rule.pro for 3rd-party libraries
* Code refactor and optimize
* Bug fixed


## 5.0.2
* Release Date: 10 Mar. 2020
* Build Number: 90300202
* Replace Cordova framework with self-maintenance Javascript for communicating
* Revise the interface naming from Vpadn to Vpon for brand identification
* Revise the interface of AdListener
* Adjust the input parameter from Activity to Context when creating ad instance
* Support mraid3 when display Banner and Interstitial Ad
* Revise the framework to make it more compatible with 3rd-party tracking solution
* Bug fix

## 4.9.1
* Release Date: 7 Aug. 2019
* Build Number: 60809102
* Support IAB OM SDK for Banner Ad, Interstitial Ad, Native Ad and Out-stream Video Ad
* Support GIF file in Native Ad Mediaview
* Bug fix

## 4.8.8
* Release Date: 26 Jun. 2019
* Build Number: 52609102
* Bug fix

## 4.8.7
* Release Date: 11 Jun. 2019
* Build Number: 01609102
* Bug fix
* Set AdView background color to transparent

## 4.8.6
* Release Date: 8 Mar. 2019
* Build Number: 80309102
* Enhance Out-stream Video Ad error reporting

## 4.8.5
* Release Date: 26 Feb. 2019
* Build Number: 52209102
* Fix TSL issue
* Fix screen orientation issue when playing video ad
* Fix tracking report issue when buffering video of Out-stream Video Ad
* Optimize debug log
* Fix few bugs

## 4.8.4
* Release Date: 30 Jan. 2019
* Build Number: 03109102
* Fix TSL issue
* Optimize debug log
* Fix few bugs

## 4.8.3
* Release Date: 02 Jan. 2019
* Build Number: 20109102
* Support targetSdk version to Android P (android sdk 28)
* Optimize ad request performance
* Optimize debug log

<!-- ## 4.8.2
* Release Date: 06 Dec. 2018
* Build Number: 50218102
* Support targetSdk version to Android P (android sdk 28)
* Optimize ad request performance
* Optimize debug log -->

## 4.8.1
* Release Date: 18 Oct. 2018
* Build Number: 81018102
* Update Android minSdkVersion compatibility to 18
* Release Out-stream Video Ad
* Fix few bugs

## 4.7.2
* Release Date: 31 July. 2018
* Build Number: 13708102
* Fix few bugs

## 4.7.1

* Release Date: 01 Feb. 2018
* Build Number: 10208102
* Improve native ad's performance and user experience
* Support new integration way on native ad
* Modify the interface of Native Ad, please repace nativeAd.loadAd(); with ```nativeAd.loadAd(adRequest);```  
* Increase advertising accuracy
* Fix few bugs

## 4.7.0

* Release Date: 18 Dec. 2017
* Build Number: 81217102
* Improve native ad's performance and user experience
* Solve the interstitial formatting probelm on the Android verson above 8.0
* Fix few bugs

## 4.6.6

* Release Date: 04 Sep. 2017
* Build Number: 40907102
* Support progress wheel to improve interstitial ad's user experience
* Fix few bugs

## 4.6.5

* Release Date: 19 Jul. 2017
* Build Number: 91707102
* Support mutiple size of the interstitial ad's close button and improve its showing timing to increase user experience
* Update impression tracking logic to reduce impression discrepancie
* Fix few bugs

## 4.6.4

* Release Date: 14 Apr. 2017
* Build Number: 41407102
* Support new interstitial ad' format combined video & App store
* Increase native ad stability
* Increase advertising accuracy
* Fix few bugs

## 4.6.3

* Release Date: 22 Dec. 2016
* Build Number: 22216102
* Support Native ad
* Increase SDK stability
* Fix few bugs

## 4.6.1

* Release Date: 04 Oct. 2016
* Build Number: 40016102
* Increase the advertising precision
* Fix few bugs

## 4.6.0

* Release Date: 05 Sep. 2016
* Build Number: 50906102
* Improve video ad's performance and user experience
* Provide a new way to integrate SDK
* Fix few bugs

## 4.5.3

* Release Date: 20 Jun. 2016
* Build Number: 02606102
* Increase SDK stability
* Fix a potential security problem

## 4.5.2

* Release Date: 20 May. 2016
* Build Number: 02506102
* Improve performance and user experience
* Support the interactive web on video ads

## 4.5.1

* Release Date: 15 Apr. 2016
* Build Number: 51406102
* Improve user experience
* Fix a potential security problem
* Fix few bugs

## 4.5.0

* Release Date: 14 Mar. 2016
* Build Number: 41306102
* Fix minor ad type bug
* Add vertical video to interstitial ads
* Improve performance

## 4.3.2

* Release Date: 22 Oct. 2015
* Build Number: 91015102
* Fix few bugs and optimize for Android 6.0+

## 4.3.1

* Release Date: 29 Jun. 2015
* Build Number: 82605102
* Fix cannot receive interstitial ad issue for Android 5.0+

## 4.3.0

* Release Date: 27 May. 2015
* Build Number: 70505102
* Enhance ad targeting.

## 4.2.8

* Release Date: 25 Feb. 2015
* Build Number: 31105102
* Encrypt customized user data for network transmission.

## 4.2.7

* Release Date: 15 Oct. 2014
* Build Number: 32904102
* Bug fixed

## 4.2.6

* Release Date: 30 July 2014
* Build Number: 82704102
* Follow Google's new policy: Support added for Google Play advertising id.

## 4.2.5

* Release Date: 21 May 2014
* Build Number: 41504102
* 修正在部分機型出現的錯誤訊息
* 增加穩定度

## 4.2.3

* Release Date: 14 April 2014
* Build Number: 11404102
* fix the ServiceConnection leaked issue in some HTC devices

## 81304102

* Release Date: 19 March 2014
* Build Number: 81304102
* Fix sometimes throws exception error while playing interstitial video ad

## beta-01304102

* Release Date: 12 March 2014
* Build Number: 01304102

### Video Ad New features

* 加強 native video view 上的 UI component
* 增加 native video view 和 web view 同時出現的廣告型態
* 增加 video 的 interstitial ad 可以先將 video 暫存到手機，減少播放影片後 buffering 的機會
* 增加 native video view 後 web view 之間的互動機制，web view 可以控制影片的播放行為並可以得知影片播放的狀態

### Other enhancement

* 大量減少開啟 GPS 的時間
* 修正使用AsyncTask造成的Exception問題


### Updates

* 更改 SDK interface，Androidmanifest.xml 裡的activity tag，將Vpon開頭的class都改成Vpadn開頭，
* 更改 package name，將 com.vpon.ads 改成 com.vpadn.ads

## 4.1.0

* Release Date: 08 Nov. 2013
* Build Number: 80113102

* Added support for rich media Ads
* Fixed disable GPS action after the home button had been pressed
* Fixed a bug of NullPointerException (NPE)

## 20803102

* Build Number: 20803102
* 修正少數 app 會有 concurrent issue.

## 4.0.1

* Build Number:32703102
* 取得 Vpon banner 後並不會把 focus 設定在這 banner 上


## 4.0.1

* Build Number:61703102
* 解決在網路速度偏低的狀態下接 Admob Mediation 有時會無法取得 Vpon Banner 的問題
* 更改暫存檔目錄，依照 Android 標準將暫存檔目錄放於 /Android/data/底下

## 20130613

* Build Number: 20130613
* fix call AsyncTask.execute in non-UI Thread

## 20130611

* Build Number: 20130611
* Fix cordova white List origin pattern issue

## 20130606

* Build Number: 20130606
* Fix Crazy Ad 會被 Android system status bar 遮住部分的問題

[SDK initialization]:{{site.baseurl}}/android/integration-guide/#initial-sdk