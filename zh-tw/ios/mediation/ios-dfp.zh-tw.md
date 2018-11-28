---
layout: "ios"
title: "iOS 中介服務 - Google Ad Manager"
lead: ""
description:
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/mediation/dfp/
lang: "zh-tw"
---
# 最新消息
---
根據 Google Ad Manager 公告，將逐步停止使用 Google Ad Manager 廣告素材中 SDK 中介服務廣告素材的功能，若您想使用 Google Ad Manager 進行 Mediation，請參考[本公告](https://support.google.com/admanager/answer/9020684)，將 SDK 中介服務廣告素材轉移到收益群組中。


# 概要
---
以下為搭配 Google Ad Manager (原 DoubleClick for Publisher) 進行廣告串接的設定方式。在開始進行設定之前，請先參考[串接說明]將 Vpon SDK 加到您的專案中。請注意，要使用 Google Ad Manager 進行廣告串接的話，請務必確認您的專案中包含以下三個檔案：

1. Google Mobile Ads SDK
2. Vpon SDK
3. Vpon AdMob Adapter

# 廣告單元設定
---

## 新增廣告單元

首先，請登入您的 [Google Ad Manager 後台]，切換到廣告空間下的廣告單元標籤，請依您要展示的廣告類型設定來新增廣告單元。

### 橫幅廣告單元
請參考 [Google Ad Manager 串接說明文件]中提供的尺吋表，並依您想展示的橫幅廣告大小選擇尺吋。

### 插頁廣告單元
插頁式廣告單元有四種常見大小，與各裝置的實際螢幕大小無關。SDK 會調整廣告素材，以便正確呈現在大小稍微不同的螢幕上。

* 手機：320x480 (直向)、480x320 (縱向)
* 平板電腦：768x1024 (直向)、1024x768 (縱向)

您不需特別為縱向模式建立個別的廣告單元，只要在指定插頁式廣告單元的訂單項中加入縱向大小 (例如，智慧型手機採 480x320)，然後除了一般的直向大小外，另外加入縱向大小的廣告素材。

範例：
![插頁尺寸]

## 產生廣告代碼

新增廣告單元後，請選擇廣告單元，再選擇產生廣告代碼。請選取代碼類型為`行動應用程式`，產生的廣告代碼格式為：<span style="color:#228B22">/networkCode/adUnitName</span>，請將此代碼加到您的專案中。

![Ad Manager 廣告單元]

# 訂單及委刊項設定
---
如要透過 Google Ad Manager 放送廣告活動，請先建立訂單，並在訂單中建立委刊項。委刊項核準並包含廣告素材後，廣告才會開始放送。

## 建立訂單
若要在執行廣告空間預測之前建立委刊單，請按照下列指示進行：

1. 在 Google Ad Manager 帳戶中，按一下 `訂單` 標籤
2. 選擇 `新增訂單`
3. 在適當欄位中輸入您的訂單資訊，不可與聯播網中其他的訂單名稱重複
4. 輸入委刊項資訊
5. 選擇 `檢查廣告空間`，確認委刊項擁有足夠的曝光供應量
6. 選擇 `儲存`，保存新建立的訂單，您必須先予以核准，訂單中的委刊項才能放送

## 建立委刊項
請參考以下說明建立委刊項：

1. 在 Google Ad Manager 帳戶中，點擊 `委刊單` 標籤
2. 您可以選擇現有的委刊單，或建立新的委刊單
3. 選擇`新增委刊項`
4. 輸入委刊項名稱，不得與聯播網中其他委刊項的名稱重複
5. 輸入您想要展示的廣告素材大小
6. 輸入委刊項類型、日期、數量和費用
7. 完成投放相關的定向設定
8. 選取您的目標廣告空間

範例：
![新增指定目標]

## 上傳廣告素材
委刊項中需包含至少一個符合目標廣告空間大小尺吋的廣告素材，廣告才可以放送

1. 選擇要新增廣告素材的委刊項，或視需求建立新委刊項
2. 選擇 `新增廣告素材`，請選擇要新增的廣告素材尺吋
3. 您可以將多個廣告素材拖曳到委刊項，或一次只加入一個廣告素材

## 新增廣告素材
選取廣告素材類型: 選取`行動應用程式`中的`SDK 中介服務廣告素材`

![廣告素材類型]

### 廣告素材設定
依次填入名稱：

1. Select Network：`Vpon`
2. Zone：`TW`
3. Vpon Ad ID：向 Vpon 申請的 `License Key`<br>

範例：
![DFP Partner Traditional Chinese.png]


# Tips
---

### Sample Code
如果您想看到完整的串接實例，請參考我們的 [Sample Code]


[串接說明]: ../../integration-guide
[Sample Code]: {{site.baseurl}}/zh-tw/ios/download/#dfp
[Google Ad Manager 後台]: https://admanager.google.com/
[Google Ad Manager 串接說明文件]: https://developers.google.com/ad-manager/mobile-ads-sdk/ios/banner#banner_sizes
[Ad Manager 廣告單元]: {{site.imgurl}}/AppAdManager_01.png
[新增指定目標]: {{site.imgurl}}/新增指定目標.png
[廣告素材類型]: {{site.imgurl}}/廣告素材類型.png
[Warning]: {{site.imgurl}}/Warning.png
[DFP Partner Traditional Chinese.png]: {{site.imgurl}}/DFP_Partner_Traditional_Chinese.png
[插頁尺寸]: {{site.imgurl}}/插頁尺寸.png
