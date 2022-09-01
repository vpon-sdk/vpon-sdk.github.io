---
layout:         "android"
title:          "Android 中介服務 - Google Ad Manager"
lead:           ""
description:    ""
keywords:       "Keywords for this page, in the meta data"
permalink:       /zh-tw/android/mediation/dfp/
lang:           "zh-tw"
---

# 最新消息
---
根據 [Google Ad Manager 公告](https://support.google.com/admanager/answer/9020684)，目前已停止使用 Google Ad Manager 廣告素材中 SDK 中介服務廣告素材的功能，若您想使用 Google Ad Manager 進行 SDK Mediation，請參考[建立及管理收益群組](https://support.google.com/admanager/answer/7390828)，將 SDK 中介服務廣告素材轉移到收益群組中。



# 概要
---
在開始進行 Google Ad Manager 設定之前，請務必確認您的專案中已包含以下三個檔案：

1. Google Mobile Ads SDK
2. Vpon SDK
3. Vpon AdMob Adapter

>**Note:** 
>
>* 除了實作廣告串接的部份外，為使廣告正常運作，並在適當的時機釋放資源，我們建議可以在 Activity 生命週期中呼叫對應的方法 (請參考 [Google Ads API])
>
>* 您可以[由此下載][1] Vpon SDK 及 Vpon AdMob Adapter。

# 廣告單元設定
---
首先，請登入您的 [Google Ad Manager 後台]，切換到廣告空間下的廣告單元標籤，請依您要展示的廣告類型設定來新增廣告單元。

## 橫幅廣告單元
請參考 [Google Ad Manager 串接說明文件]中提供的尺吋表，並依您想展示的橫幅廣告大小選擇尺吋。

## 插頁廣告單元
插頁式廣告單元有四種常見大小，與各裝置的實際螢幕大小無關。SDK 會調整廣告素材，以便正確呈現在大小稍微不同的螢幕上。

* 手機：320x480 (直向)、480x320 (縱向)
* 平板電腦：768x1024 (直向)、1024x768 (縱向)

您不需特別為縱向模式建立個別的廣告單元，只要在指定插頁式廣告單元的訂單項中加入縱向大小 (例如，智慧型手機採 480x320)，然後除了一般的直向大小外，另外加入縱向大小的廣告素材。


## 原生廣告單元

請依所需的原生廣告大小，設定廣告單元。


# 產生廣告代碼
---

新增廣告單元後，請選擇廣告單元，再選擇產生廣告代碼。請選取代碼類型為`行動應用程式`，產生的廣告代碼格式為：<span style="color:#228B22">/networkCode/adUnitName</span>，請將此代碼加到您的專案中。

![Ad Manager 廣告單元]

# 收益群組設定
---

## 新增收益夥伴

完成廣告單元的設定後，請先到管理標籤下的公司頁面，新增 Vpon 為您的收益夥伴：

1. 請點選`新增公司`，並選擇`廣告聯播網`
2. 輸入您自定義的名稱，並在廣告聯播網的欄位選擇 `Vpon`
3. 請依您的需求完成選用設定後儲存


## 設定收益群組

請到廣告放送下的收益群組頁面，參考以下步驟，完成收益群組設定：

1. 新增收益群組
2. 指定要投放的廣告格式及廣告空間類型
3. 指定要投放的廣告空間
4. 依您的需求，選擇是否指定投放的裝置類別、作業系統、地理位置等設定
5. 點選新增收益夥伴，選擇 `Vpon`
6. 選擇整合類型
* 串接`橫幅廣告`或是`插頁廣告`，請選擇`Mobile SDK`，並在 Zone 的欄位填入 `TW`、在 Vpon Ad ID 的欄位填入 `Vpon License Key`
* 串接`原生廣告`，請選擇`自訂事件中介服務`，並在 Class Name 的欄位填入 `com.vpadn.mediation.VpadnAdapter`，在 Parameter 的欄位填入 `Vpon License Key`
7. 儲存您的設定


>**Note**: 使用 GAM Mediation 搭配 Vpon Adapter 串接原生廣告時，adListener 的行為可能會與單獨使用 GAM 不一致。<br>
可能會受到影響的 adListener: `onAdLeftApplication`、`onAdClosed`


# Tips
---

### Sample Code
如果您想看到完整的串接實例，請參考我們的 [Sample Code]


[串接說明]: ../../integration-guide
[Sample Code]: {{site.baseurl}}/zh-tw/android/download/#dfp
[Google Ad Manager 後台]: https://admanager.google.com/
[Google Ad Manager 串接說明文件]: https://developers.google.com/ad-manager/mobile-ads-sdk/ios/banner#banner_sizes
[Ad Manager 廣告單元]: {{site.imgurl}}/AppAdManager_01.png
[新增指定目標]: {{site.imgurl}}/新增指定目標.png
[廣告素材類型]: {{site.imgurl}}/廣告素材類型.png
[Warning]: {{site.imgurl}}/Warning.png
[DFP Partner Traditional Chinese.png]: {{site.imgurl}}/DFP_Partner_Traditional_Chinese.png
[插頁尺寸]: {{site.imgurl}}/插頁尺寸.png

[1]: {{site.baseurl}}/zh-tw/android/download
[Google Ads API]: https://developers.google.com/android/reference/com/google/android/gms/ads/BaseAdView#pause()