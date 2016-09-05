# Android Changelog

### 4.6.0

* Release Date: 05 Sep. 2016
* Build Number: 50906102
* Improve video ad's performance and user experience
* Provide a new way to integrate SDK
* Fix few bugs

### 4.5.3

* Release Date: 20 Jun. 2016
* Build Number: 02606102
* Increase SDK stability
* Fix a potential security problem

### 4.5.2

* Release Date: 20 May. 2016
* Build Number: 02506102
* Improve performance and user experience
* Support the interactive web on video ads

### 4.5.1

* Release Date: 15 Apr. 2016
* Build Number: 51406102
* Improve user experience
* Fix a potential security problem
* Fix few bugs

### 4.5.0

* Release Date: 14 Mar. 2016
* Build Number: 41306102
* Fix minor ad type bug
* Add vertical video to interstitial ads
* Improve performance

### 4.3.2

* Release Date: 22 Oct. 2015
* Build Number: 91015102
* Fix few bugs and optimize for Android 6.0+

### 4.3.1

* Release Date: 29 Jun. 2015
* Build Number: 82605102
* Fix cannot receive interstitial ad issue for Android 5.0+

### 4.3.0

* Release Date: 27 May. 2015
* Build Number: 70505102
* Enhance ad targeting.

### 4.2.8

* Release Date: 25 Feb. 2015
* Build Number: 31105102
* Encrypt customized user data for network transmission.

### 4.2.7

* Release Date: 15 Oct. 2014
* Build Number: 32904102
* Bug fixed

### 4.2.6

* Release Date: 30 July 2014
* Build Number: 82704102
* Follow Google's new policy: Support added for Google Play advertising id.

### 4.2.5

* Release Date: 21 May 2014
* Build Number: 41504102
* 修正在部分機型出現的錯誤訊息
* 增加穩定度

### 4.2.3

* Release Date: 14 April 2014
* Build Number: 11404102
* fix the ServiceConnection leaked issue in some HTC devices

### 81304102

* Release Date: 19 March 2014
* Build Number: 81304102
* Fix sometimes throws exception error while playing interstitial video ad

### beta-01304102

* Release Date: 12 March 2014
* Build Number: 01304102

#### Video Ad New features

* 加強 native video view 上的 UI component
* 增加 native video view 和 web view 同時出現的廣告型態
* 增加 video 的 interstitial ad 可以先將 video 暫存到手機，減少播放影片後 buffering 的機會
* 增加 native video view 後 web view 之間的互動機制，web view 可以控制影片的播放行為並可以得知影片播放的狀態

#### Other enhancement

* 大量減少開啟 GPS 的時間
* 修正使用AsyncTask造成的Exception問題


#### Updates

* 更改 SDK interface，Androidmanifest.xml 裡的activity tag，將Vpon開頭的class都改成Vpadn開頭，
* 更改 package name，將 com.vpon.ads 改成 com.vpadn.ads

### 4.1.0

* Release Date: 08 Nov. 2013
* Build Number: 80113102

* Added support for rich media Ads
* Fixed disable GPS action after the home button had been pressed
* Fixed a bug of NullPointerException (NPE)

### 20803102

* Build Number: 20803102
* 修正少數 app 會有 concurrent issue.

### 4.0.1

* Build Number:32703102
* 取得 Vpon banner 後並不會把 focus 設定在這 banner 上


### 4.0.1

* Build Number:61703102
* 解決在網路速度偏低的狀態下接 Admob Mediation 有時會無法取得 Vpon Banner 的問題
* 更改暫存檔目錄，依照 Android 標準將暫存檔目錄放於 /Android/data/底下

###

* Build Number: 20130613
* fix call AsyncTask.execute in non-UI Thread

### 20130611

* Build Number: 20130611
* Fix cordova white List origin pattern issue

### 20130606

* Build Number: 20130606
* Fix Crazy Ad 會被 Android system status bar 遮住部分的問題
