---
layout: "ios"
title: "iOS 中介服務 - DFP"
lead: ""
description: 
keywords: 'Keywords for this page, in the meta data'
permalink: /zh-tw/ios/mediation/dfp/
lang: "zh-tw"
---
本頁專為 DFP 使用者而設，主要說明 DoubleClick 聯播網搭配 Google AdMob 廣告 SDK 的方式。請先從[串接說明]看起，熟悉文件後，再回來參考本頁，瞭解如何同時執行 SDK 和 DFP。

使用 AdMob 或 DFP 串接時，請務必將兩個 lib 檔都要加入到您的專案內([下載][1])

1. Fundamental SDK
2. Adapter SDK


# DFP 廣告單元編號
---
DFP 使用者必須指定「DFP 廣告單元編號」，而不是「AdMob 發佈商編號」，這樣 Google AdMob 廣告 SDK 才知道要使用 DoubleClick 聯播網，而不是 AdMob 聯播網。DFP 廣告單元編號的格式像這樣：<span style="color:#228B22">/networkCode/adUnitName。</span>


## 設定廣告單元
在 DFP 使用者介面中([Here])：

1. 新增廣告空間
2. 在廣告單元中設定名稱、 大小、目標視窗後儲存
3. 產生廣告代碼 (選取行動應用裝置)

![DFP 廣告空間]

## 設定委刊單、委刊項及廣告素材
如要透過「DFP 廣告管理系統標準版」放送新的廣告活動，請先建立新委刊單。建好委刊單後，您還必須建立委刊項、新增廣告素材以及核准委刊單，委刊單廣告才能放送。針對保留的委刊項類型 (贊助和標準)，在委刊單獲得核准以前，DFP 不會保留廣告空間。<br><br>

## 建立委刊單
若要在執行廣告空間預測之前建立委刊單，請按照下列指示進行：

1. 在「DFP 廣告管理系統標準版」帳戶中，按一下 `委刊單` 標籤。

2. 按一下 `新增委刊單`。

3. 在適當欄位中輸入您的委刊單資訊。
   不可與聯播網中其他的委刊單名稱重複。

4. 輸入委刊項資訊。

5. 按一下 `檢查廣告空間`，確認委刊單擁有足夠的曝光供應量。
![Warning]

6. 按一下 `儲存`。
    建好委刊單之後，您必須先予以核准，委刊項才能放送。
<br><br>

## 委刊項資訊
如何建立委刊項：

1. 在 DFP 廣告管理系統標準版帳戶中，按一下 `委刊單` 標籤。

2. 建立新委刊單，或按一下表格中的現有委刊單。

3. 按一下 [新增委刊項]。

4. 輸入委刊項名稱，不得與聯播網中其他委刊項的名稱重複。

5. 輸入您想要上傳廣告素材的廣告空間大小。

6. (選用程序) 輸入任何有助於委刊項投放作業的相關註釋。

7. 輸入委刊項類型、日期、數量和費用。

8. (選用程序) 在 `調整放送` 下方進行放送設定。

9. 選取您的目標廣告空間。

您可以指定廣告單元、刊登位置或同時指定兩者。如要尋找要指定的廣告空間，可以逐步瀏覽聯播網的廣告空間或是執行搜尋。

廣告單元會沿用您的聯播網名稱，代表您聯播網中所有的廣告單元。如果您為委刊項指定這個聯播網層級的廣告單元，委刊項將指定聯播網中的任何廣告單元。<br>
<br>範例：<br>
![新增指定目標]
10. (選用程序) 輸入其他指定條件，指定特定目標對象。如果您未將委刊項指定給任何廣告單元或刊登位置，系統會將委刊項設成在全聯播網隨機放送。這表示委刊項可在您網站上的任何廣告單元中放送。按一下 [儲存]。<br><br>

## 上傳廣告素材
1. 按一下要新增廣告素材的委刊項。您也可以視需求建立新委刊項。

2. 按一下 `新增廣告素材`。所有與委刊項相關聯的廣告素材和廣告單元尺寸，都會列在左欄中。您可以將廣告素材上傳至清單中任何大小的廣告單元。

3. 您可以將多個廣告素材拖曳到委刊項，或一次只加入一個廣告素材<br><br>

### 只加入一個廣告素材
選取廣告素材類型: 選取`行動應用程式`中的`SDK 中介服務廣告素材`<br>
![廣告素材類型]

### 廣告素材設定
依次填入名稱：

1. Select Network：`Vpon`
2. Zone：`TW` 或 `CN`
3. Vpon Ad ID：向 Vpon 申請的 `License key`<br>

範例：
![DFP Partner Traditional Chinese.png]



# 橫幅/插頁式廣告單元
---
## 橫幅廣告單元
文章前面篇幅皆討論橫幅的廣告單元，尺寸設定值為 320x50

## 插頁廣告單元
您可以在 DFP 中建立廣告單元，做為插頁式廣告單元。插頁式廣告單元有四種常見大小，與各裝置的實際螢幕大小無關。SDK 會調整廣告素材，以便正確呈現在大小稍微不同的螢幕上。

* 手機：320x480 (直向)、480x320 (縱向)
* 平板電腦：768x1024 (直向)、1024x768 (縱向)

您不需特別為縱向模式建立個別的廣告單元，只要在指定插頁式廣告單元的訂單項中加入縱向大小 (例如，智慧型手機採 480x320)，然後除了一般的直向大小外，另外加入縱向大小的廣告素材。

範例：
![插頁尺寸]






# 其它訣竅
---
[DFP Small Business](https://support.google.com/dfp_sb/)<br>
[Google Developers DFP Banner Ads](https://developers.google.com/mobile-ads-sdk/docs/dfp/fundamentals#ios)<br>
[Google Developers Interstitial Ads](https://developers.google.com/mobile-ads-sdk/docs/ios/doubleclick/#support)

# Sample Code 下載
---
 [Go to Download Sample Code][1]


[串接說明]: ../../integration-guide
[1]: {{site.baseurl}}/zh-tw/ios/download/#dfp
[Here]: https://www.google.com/dfp/
[DFP 廣告空間]: {{site.imgurl}}/DFP_廣告空間.png
[新增指定目標]: {{site.imgurl}}/新增指定目標.png
[廣告素材類型]: {{site.imgurl}}/廣告素材類型.png
[Warning]: {{site.imgurl}}/Warning.png
[DFP Partner Traditional Chinese.png]: {{site.imgurl}}/DFP_Partner_Traditional_Chinese.png
[插頁尺寸]: {{site.imgurl}}/插頁尺寸.png
