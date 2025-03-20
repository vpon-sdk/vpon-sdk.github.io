# Vpon iOS SDK Change Log

## 5.7.4
* Release Date: 20 Mar. 2025
* Minor code refactor

## 5.7.2
* Release Date: 4 Nov. 2024
* add new property : advertise in nativead
* Bug fix

## 5.6.3
* Release Date: 16 Jul. 2024
* Bug fix

## 5.6.2
* Release Date: 28 May. 2024
* Upgrade to IAB OM SDK v1.4.13
* Remove Out-stream Video Ad
* Support Vpon Flutter Plugin

## 5.6.1
* Release Date: 26 Mar. 2024
* Bug fix

## 5.6.0
* Release Date: 25 Jan. 2024
* Add Ad Choices for Native Ad
* Add Privacy Manifest to comply with App Store Review Policy
* Interface Update for Banner, Interstitial and Native
* Interface Deprecation: interface in v5.5.0 and below will be remarked as deprecated

## 5.5.0
* Release Date: 5 Sept. 2023
* Compliant with IAB OM SDK v1.4.4
* Code language change from Objective-C to Swift
* Deprecate unused interfaces and attributes
* Potential crash while request multiple Banner ads in the same page

## 5.4.8
* Release Date: 03 Jul. 2023
* Fix Native Ad component loss issue

## 5.4.6
* Release Date: 22 Feb. 2023
* Stop supporting deprecated VpadnNativeAdDelegate, warning message will show in the IDE if Publisher use the deprecated callback
* Remove the implementation in VpadnNativeAdsManager.m (keep the .h file in the meanwhile) and deprecate the initializer, warning message will show in the IDE if Publisher use the deprecated initializer

## 5.4.4
* Release Date: 12 Dec. 2022
* Trim url string to prevent potential error occured while parsing urls

## 5.4.2
* Release Date: 3 Oct. 2022
* Fix the runtime warning message to compatible with Xcode 14 Beta 5 and iOS 16 (simulator)
* Support ad lifecycle for Native Ad webview case
* Bug fix

## 5.4.0
* Release Date: 11 Aug. 2022
* Upgrade OM SDK to v1.3.34
* Adjust video event sending logic to fulfill OM SDK spec
* Fix unexpected layout shifting on Interstitial Ad while changing the device orientation

## 5.3.4
* Release Date: 25 Mar. 2022
* Officially deprecate VpadnAdSizeSmartBannerPortrait and VpadnAdSizeSmartBannerLandscape
* Unified the logic of OM Ad Session creation and creativeType

## 5.3.2 (Deprecated)
* Release Date: 30 Nov. 2021
* Adjust minimum support OS version to iOS 11.0

## 5.3.0
* Release Date: 2 Aug. 2021
* Build Number: 20210702
* Add new video tracking event Progress
* Support OM SDK v1.3.20
* Support xcframework

## 5.2.0
* Release Date: 2 Mar. 2021
* Build Number: 20210301
* Add new ad format: VpadnAdSizeLARGEBANNER (320x100 Banner)

## 5.1.10
* Release Date: 4 Feb. 2021
* Build Number: 20210203
* Bug fix

## 5.1.9
* Release Date: 12 Jan. 2021
* Build Number: 20210112
* Support video creatives in VpadnAdSizeLargeRectangle
* Adjust the variable type of JSON sent through Mraid


## 5.1.8
* Release Date: 27 Nov. 2020
* Build Number: 20201127
* Add a new interface VpadnAdAudioManager to manage the Audio Session setting, SDK will set and activate the Audio Session by default when intilizing SDK. For more information, please check [Advanced] 


## 5.1.7
* Release Date: 11 Nov. 2020
* Build Number: 20201111
* Add addFriendlyObstruction interface base on OM Framework for Publisher to declare those overlay views which won't block the ad visibility as friendly obstruction
* Support HTML type creatives in Native Ad MediaView
* Support to resize the Banner Adview responsively to fit the ad container
* Fix Video Banner can't be played automatically in specific scenario
* Bug fix


## 5.1.3
* Release Date: 12 Aug. 2020
* Build Number: 20200811
* Add a new Banner Ad size 320x480 (Not available for mediation case)
* Support video content in 320x480 and 300x250 Banner Ad

## 5.1.2
* Release Date: 22 Jul. 2020
* Build Number: 20200722
* Fix the issue that audio will be interrupted if ad display
* Fix the issue that 3rd-party tracking of Native Ad might be sent unsuccessfully

## 5.1.1
* Release Date: 8 Jul. 2020
* Build Number: 20200702
* Upgrade OM SDK from v1.2.8 to v1.3.4
* Totally replace UIWebView with WKWebView
* Added contentUrl and contentData for data transmission (compatible with AdMob / MoPub)

## 5.0.5
* Release Date: 27 Apr. 2020
* Build Number: 20200427
* Bug fix

## 5.0.4
* Release Date: 1 Apr. 2020
* Build Number: 20200401
* Modify the string “UIWebView” in comments
* Optimize the performance of Banner Ad

## 5.0.3
* Release Date: 20 Mar. 2020
* Build Number: 20200320
* Bug fix: fix crash caused by outputVolume observer remove

## 5.0.2
* Release Date: 10 Mar. 2020
* Build Number: 20200310
* Replace Cordova framework with self-maintenance Javascript for communicating
* Replace UIWebView with WKWebView
* Revise the interface of Banner / Interstitial / Native Ad
* Revise the framework to make it more compatible with 3rd-party tracking solution
* Support mraid3 when display Banner and Interstitial Ad

## 4.9.4
* Release Date: 15 Nov. 2019
* Build Number: 31119102
* Revise the mechanism of Swizzling Method
* Revise the measurement timing of Banner Ad and Native Ad (OM related)

## 4.9.3

* Release Date: 7 Oct. 2019
* Build Number: 70019102
* Optimize the structure of Interstitial Ad
* Add a method for [SDK initialization], ad requests will `fail` unless Vpon SDK is initialized
* Add an examination of Photo Library Additions Usage Description

>* Note: This release is a __`MAJOR`__ version update.

## 4.9.2

* Release Date: 14 Aug. 2019
* Build Number: 41809102
* Revise the structure of Interstitial Ad (Video)

## 4.9.1

* Release Date: 7 Aug. 2019
* Build Number: 70809102
* Support IAB OM SDK for Banner Ad, Interstitial Ad, Native Ad and Out-stream Video Ad
* Support GIF file in Native Ad Mediaview
* Optimize Interstitial Ad and Native Ad performance

## 4.8.7

* Release Date: 02 Jul. 2019
* Build Number: 10709102
* Bug fix

## 4.8.6

<!-- * Release Date: 11 Jun. 2019 -->
<!-- * Build Number: 11609102 -->
* Release Date: 13 Jun. 2019
* Build Number: 31609102
* Adjustment for iOS 13
* Optimize Banner Ad and Native Ad performance
* Fix Native Ad MediaView unclickable issue

## 4.8.5

* Release Date: 29 May. 2019
* Build Number: 82509102
* Fix specific Interstitial Ad display issue

## 4.8.4

* Release Date: 8 Mar. 2019
* Build Number: 80309102
* Enhance Out-stream Video Ad error reporting

## 4.8.3

* Release Date: 18 Dec. 2018
* Build Number: 81218102
* Fix the crash when user deny to admit location related permission

## 4.8.2

* Release Date: 27 Nov. 2018
* Build Number: 62118102
* Update system requirement to iOS 9.0
* Optimize ad request performance
* Support AdMob Native Ad mediation (AdMobAdapterVpadn-1.0.8 above is required)
* Bugs fix

## 4.8.1

* Release Date: 18 Oct. 2018
* Build Number: 81018102
* Release Out-stream Video Ad
* Fix few bugs

## 4.7.1

* Release Date: 01 Feb. 2018
* Build Number: 10208102
* Fix the bug that close button would be shown in the wrong position
* Improve native ad's performance and user experience
* Support new integration way on native ad
* Increase advertising accuracy

## 4.7.0

* Release Date: 18 Dec. 2017
* Build Number: 81217102
* Improve native ad's performance and user experience
* Prevent cleaning cache in the app
* Fix few bugs

## 4.6.7

* Release Date: 28 Sep. 2017
* Build Number: 82907102
* Fix the bug which causes crash error on iPhone X simulator
* Adjust few layouts to fit iPhone X

## 4.6.6

* Release Date: 04 Sep. 2017
* Build Number: 40907102
* Address compatibility issues for iOS 11
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
* Support HTTPS for ATS
* Increase SDK stability
* Fix few bugs

## 4.6.1

* Release Date: 05 Sep. 2016
* Build Number: 02906102
* Fix few bugs
* AdMob Adapter 1.0.2 supports Bitcode

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
* Fix build error for iOS 7.3+
* Fix few bugs

## 4.5.0

* Rlease Date: 14 Mar. 2016
* Build Number: 41306102
* Decrease unecessary log
* Fix pop-out video sound bug
* Add vertical video to interstitial ads

## 4.2.19

* Build Number: 32215102
* Minor bug fixed.
* Excessive log trimmed.

## 4.2.18

* Build Number: 71115102
* localStorage bug fixed.
* PresentView bug fixed.

## 4.2.17

* Build Num 62015102
* Optimize for iOS9.
* Bitcode problem fixed.
* Add new framework for easier integration.
* Minor bugs fixed.


## 4.2.16

* Optimize for iOS9.
* Enhance version stability.
* Bugs fixed.
* Release date: 2015/09/14

## 4.2.14

* Build Number: 40605102
* Fixed: in app 開啟 app store 廣告時, 會無法連接出去
* 針對 AdMob adapter 的 crash 問題做了相關修正

## 4.2.12

* Build Number: 61205102
* Fixed Video UI error.

## 4.2.9

* Build Number: 12114102
Fixed: show multiple banner

## 4.2.8

* Build Number: 70804102
* Fixed: prevent cache crash which happens in the sdk 4.2.7
* Fixed: crash issues on iOS8
* Removed: relevant framework of addressBook and addressBookUI for uploading app to Applestore

## 4.2.7

* Build Number: 21604102
* 修正插頁式廣告顯示問題


## 4.2.6

* Build Number: 60604102
* 修正 iOS6 以下取用權限造成 crash


## 4.2.5

* Build Number: 51504102
* 新增 64 bit 版本

## 4.2.3

* Build Number: 62304102
* 修正 Video tracking 機制

## 4.2.2

* Build Number: 62304102

### Major Build Change
* Video Ad New features:
* 加強 native video view 上的 UI component
* 增加 native video view 和 web view 同時出現的廣告型態
* 增加 video interstitial ad 可以先將video 暫存到手機，減少播放影片後 buffering 的機會
* 增加 native video view 後 web view 之間的互動機制，web view 可以控制影片的播放行為並可以得知影片播放的狀態

### Enhance:
* 大量減少開啟 GPS 的時間
* 調整遮蔽偵測效率

### Updates:
* 改成Vpadn開頭，也更改class name及protocol function name

## 4.1.0

* Build Number: 821131024 & 821131025
* Release Date: 28 Nov. 2013
* Added support for rich media Ads
* Added support for interstitial Ads in Landscape
* Fixed for disable GPS action after the home button had been pressed

## 309031024 & 309031025
* Build Number: 309031024 & 309031025
* Fixed view position due to coordinate system changes in iOS 7.
* Modify internal static variable name to prevent name conflict with other 3rd party libraries (for ex. Google Analytics)
* Add 2 branches of library. One for XCode4, the other for XCode5.

## 42703102

* Build Number: 42703102
* Fixed: bug with ad can't open

## 71703102

* Build Number: 71703102
* Fixed: resolve function naming conflict

## 30703102

* Build Number: 30703102
* Fixed: resolve lower network connection can't get Vpon banner

## 82603102

* Build Number: 82603102
* Fixed: in app webView can't show on the view
* Removed: removeed UDID in any possible place

## 21603102

* Build Number: 21603102
* Fixed: interstitial Ad position error

[SDK initialization]:{{site.baseurl}}/ios/integration-guide/#initial-sdk
[Advanced]:{{site.baseurl}}/ios/advanced/#audio